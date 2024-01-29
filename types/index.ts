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

export type User = {
  email: string;
};

export type NotificationType =
  | 'WELCOME'
  | 'CHANGE_OF_STOCK'
  | 'LOWEST_PRICE'
  | 'THRESHOLD_MET';

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};
