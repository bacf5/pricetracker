import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapePadelProduct(url: string) {
  const regx = /[a-zA-Z]+\D+/;

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
    const specialPrice = $('[data-role=priceBox] .special-price span:first')
      .text()
      .trim()
      .replace(regx, '');
    const oldPrice = $('[data-role=priceBox] .old-price span:first')
      .text()
      .trim()
      .replace(regx, '');
    console.log({ title, description, specialPrice, oldPrice });
  } catch (error: any) {
    throw new Error(`Failed to scrape the product: ${error.message}`);
  }
}
