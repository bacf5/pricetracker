import { PriceHistoryItem } from '@/types';
import { Product } from '@/types';

const NotificationType = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

const THRESHOLD_PERCENTAGE = 40;

export function makeStringToNumber(value: any) {
  const price = value[0];
  const priceNumber = parseFloat(price.replace(',', '.'));

  return priceNumber;
}

export function makePercentagePrice(price: number, oldPrice: number) {
  // if (oldPrice > price) return price;
  const percentage = ((oldPrice - price) / oldPrice) * 100;
  const percentageRounded = Math.round(percentage);
  return percentageRounded;
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }
  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }
  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce(
    (accum, currentValue) => accum + currentValue.price,
    0
  );
  const avgPrice = sumOfPrices / priceList.length || 0;
  const avgPriceRounded = Math.round(avgPrice);

  return avgPriceRounded;
}

export function getEmailNotificationType(
  scrapedProduct: Product,
  currentProduct: Product
) {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.finalPrice < lowestPrice) {
    return NotificationType.LOWEST_PRICE as keyof typeof NotificationType;
  }

  if (scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return NotificationType.CHANGE_OF_STOCK as keyof typeof NotificationType;
  }

  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return NotificationType.THRESHOLD_MET as keyof typeof NotificationType;
  }
  return null;
}
