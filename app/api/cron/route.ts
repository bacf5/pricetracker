import Product from '@/lib/models/product.model';
import { connectToDatabase } from '@/lib/mongoose';
import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { scrapePadelProduct } from '@/lib/scraper';
import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotificationType } from '@/lib/utils';
import { NextResponse } from 'next/server';

export const maxDuration = 10;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDatabase();
    // get all products
    const products = await Product.find({});

    if (!products) throw new Error('No products fetched');

    // scrape products details and update database

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapePadelProduct(currentProduct.url);
        if (!scrapedProduct) return;

        const updatedPriceHistory: any = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.finalPrice,
          },
        ];
        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate({ url: product.url }, product);

        // Check each product & send mail if changes

        const emailNotificationType = getEmailNotificationType(scrapedProduct, currentProduct);

        if (emailNotificationType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(productInfo, emailNotificationType);

          const userEmails = updatedProduct.users.map((user: any) => user.email);

          await sendEmail(emailContent, userEmails);
        }
        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error('Something went wrong in GET,' + error);
  }
}
