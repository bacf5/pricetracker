import axios from 'axios';
import * as cheerio from 'cheerio';
import { makePercentagePrice, makeStringToNumber } from '../utils';

export async function scrapePadelProduct(url: string) {
  // regex for the price
  const regx = /\b\d{3},\d{2}\b/g;

  if (!url) return;

  // BrightData Configuration

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (10000000 * Math.random()) | 0;

  // Whith this object we can make a request to get the data from BrightData

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page & do te scraping
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $('.page-title span').text().trim();
    const description = $('.value p').text().trim();

    const isOutOfStock = $('.action.alert').text().trim() ? true : false;

    // BUG: Theres some pages that do not have 'special price' and crash the app. Looking into this later

    /* const specialPrice =
      $('[data-role=priceBox] .special-price span:first')
        .text()
        .trim()
        .match(regx); */

    const finalPrice = $('[data-price-type="finalPrice"] span:first')
      .text()
      .trim()
      .match(regx);
    const oldPrice =
      $('[data-role=priceBox] .old-price span:first')
        .text()
        .trim()
        .match(regx) || finalPrice;

    // Convert array/strings scraped to number to be able to compare and calculate percentage
    // TODO some refactor and make it more pretty but not now okay? thanks

    // const specialPriceNumber = makeStringToNumber(specialPrice);

    const finalPriceNumber = makeStringToNumber(finalPrice);
    const oldPriceNumber = makeStringToNumber(oldPrice);
    const discountRate = makePercentagePrice(finalPriceNumber, oldPriceNumber);
    const lowestNumber =
      oldPriceNumber < finalPriceNumber ? oldPriceNumber : finalPriceNumber;
    const highestNumber =
      finalPriceNumber < oldPriceNumber ? finalPriceNumber : oldPriceNumber;
    const image = $('.gallery-placeholder__image').attr('src');

    // Construct data object with scraped info

    const data = {
      url,
      title: title,
      description: description,
      image: image || '',
      oldPrice: oldPriceNumber || finalPriceNumber,
      finalPrice: finalPriceNumber || oldPriceNumber,
      lowestPrice: lowestNumber,
      highestPrice: highestNumber,
      averagePrice: 0,
      priceHistory: [],
      discountRate: discountRate,
      isOutOfStock: isOutOfStock,
    };
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape the product: ${error.message}`);
  }
}
