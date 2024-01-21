'use server';

import Product from '../models/product.model';
import { connectToDatabase } from '../mongoose';
import { scrapePadelProduct } from '../scraper';

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
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update the product: ${error.message}`);
  }
}
