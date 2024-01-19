export function makeStringToNumber(value: any) {
  const price = value[0];
  const priceNumber = parseFloat(price.replace(',', '.'));

  return priceNumber;
}
