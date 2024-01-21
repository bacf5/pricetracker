export type PriceHistoryItem = {
  price: number;
};

export type Product = {
  _id?: string;
  url: string;
  image: string;
  title: string;
  oldPrice: number;
  finalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  isOutOfStock: Boolean;
};
