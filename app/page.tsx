import HeroCarousel from '@/components/HeroCarousel';
import Searchbar from '@/components/Searchbar';
import TrendingCard from '@/components/TrendingCard';
import { getAllProducts } from '@/lib/actions';
import Image from 'next/image';
import React from 'react';

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Tu búsqueda comienza aquí <Image src="/assets/icons/arrow-right.svg" alt="Arrow Right" width={16} height={16} />
            </p>
            <h1 className="head-text">
              Buscá y esperá el
              <span className="text-primary"> mejor precio</span>
            </h1>
            <p className="mt-6">¿Estás esperando un descuento para ese producto que querés? ¡Seguilo acá y cómpralo al precio más bajo!</p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text"> Trending </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <TrendingCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
