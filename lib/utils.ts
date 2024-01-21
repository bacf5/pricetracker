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
