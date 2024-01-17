import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapePadelProduct(url: string) {
  // scraper logic here

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
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const title = $('.page-title span').text().trim();
    console.log({ title });
  } catch (error: any) {
    throw new Error(`Failed to scrape the product: ${error.message}`);
  }
}
