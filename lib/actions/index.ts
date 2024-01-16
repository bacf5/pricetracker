'use server';

import { scrapePadelProduct } from '../scraper';

export async function scrapeAndStoreProduct(productUrl: string) {
  // scrapear el producto y guardarlo en la base de datos para poder trackear el precio

  if (!productUrl) return;

  try {
    const scapedProduct = await scrapePadelProduct(productUrl);
  } catch (error: any) {
    throw new Error(`Failed to create/update the product: ${error.message}`);
  }
}
