'use server';

import Product from '../models/product.model';
import { connectToDatabase } from '../mongoose';
import { scrapePadelProduct } from '../scraper';
import { getHighestPrice, getLowestPrice, getAveragePrice } from '../utils';
import { revalidatePath } from 'next/cache';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDatabase();

    const scrapedProduct = await scrapePadelProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    // Create or update the product price history based on the scraped product
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        {
          price: scrapedProduct.finalPrice,
        },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    revalidatePath(`/products/${newProduct.id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update the product: ${error.message}`);
  }
}
