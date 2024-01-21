'use server';

import { scrapePadelProduct } from '../scraper';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scapedProduct = await scrapePadelProduct(productUrl);
    if (!scapedProduct) return;
  } catch (error: any) {
    throw new Error(`Failed to create/update the product: ${error.message}`);
  }
}
