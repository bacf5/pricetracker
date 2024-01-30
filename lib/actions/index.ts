'use server';

import Product from '../models/product.model';
import { connectToDatabase } from '../mongoose';
import { scrapePadelProduct } from '../scraper';
import { getHighestPrice, getLowestPrice, getAveragePrice } from '../utils';
import { revalidatePath } from 'next/cache';
import { EmailContent, User } from '@/types';
import { generateEmailBody, sendEmail } from '../nodemailer';

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

export async function getProductById(productId: string) {
  try {
    connectToDatabase();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDatabase();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}
export async function getSimilarProducts(productId: string) {
  try {
    connectToDatabase();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, 'WELCOME');

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
