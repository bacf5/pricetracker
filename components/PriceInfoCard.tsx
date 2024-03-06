import React from 'react';
import Image from 'next/image';
interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

export const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className="price-info_card">
      {/* <div className="absolute transform rotate-45 bg-green-500 text-center text-white font-semibold text-sm right-[-35px] top-[32px] w-[170px]">
        ??% Descuento
      </div> */}
      <p className="text-base text-black-100">{title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={24} height={24} />
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  );
};

// absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]
