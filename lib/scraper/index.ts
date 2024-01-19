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

    // problem which is not solved yet TODO
    // TODO outofstock prodcut alert have html

    // const outOfStock = $('a .action alert').text();

    const specialPrice = $('[data-role=priceBox] .special-price span:first')
      .text()
      .trim()
      .match(regx);
    const finalPrice = $('[data-price-type="finalPrice"] span:first')
      .text()
      .trim()
      .match(regx);
    const oldPrice = $('[data-role=priceBox] .old-price span:first')
      .text()
      .trim()
      .match(regx);

    // Convert array/strings scraped to number to be able to compare and calculate percentage // TODO refactor and make it more pretty but not now okay? thanks

    const specialPriceNumber = makeStringToNumber(specialPrice);
    const finalPriceNumber = makeStringToNumber(finalPrice);
    const oldPriceNumber = makeStringToNumber(oldPrice);
    const discountRate = makePercentagePrice(finalPriceNumber, oldPriceNumber);
    const image = $('.gallery-placeholder__image').attr('src');

    // Construct data object with scraped info

    // console.log(outOfStock);

    const data = {
      url,
      title: title,
      description: description,
      img: image,
      oldPrice: oldPriceNumber,
      finalPrice: finalPriceNumber,
      discount: discountRate,
    };
  } catch (error: any) {
    throw new Error(`Failed to scrape the product: ${error.message}`);
  }
}
