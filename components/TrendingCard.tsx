import React from 'react';
import { Product } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  product: Product;
}
const TrendingCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="trending-card">
      <div className="trending-card_img-container hover:scale-110 transition ease-in">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="trending-card_img border border-[#fe612392] border-opacity-50 rounded-[17px]"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="trending-title">{product.title}</h4>
        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">{`€ ${product.lowestPrice}`}</p>
          {/* <p>//TODO parsear la fecha que viene de product.createdAt</p> */}
        </div>
      </div>
    </Link>
  );
};

export default TrendingCard;
