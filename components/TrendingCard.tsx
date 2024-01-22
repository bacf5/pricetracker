import React from 'react';
import { Product } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  product: Product;
}
const TrendingCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="trending-card_img"
        />
      </div>
    </Link>
  );
};

export default TrendingCard;
