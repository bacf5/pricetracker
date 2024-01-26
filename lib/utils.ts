import { PriceHistoryItem } from '@/types';
import { cursorTo } from 'readline';

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
