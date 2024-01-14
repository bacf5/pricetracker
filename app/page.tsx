import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping start here:{' '}
              <Image
                src="assets/icons/arrow-right.svg"
                alt="Arrow Right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of{' '}
              <span className="text-primary">tracking prices</span>
            </h1>
            <p className="mt-6">
              Are you waiting for a discount for a dream product? Follow it here
              and buy it at its lowest price!
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text"> Trending </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Apple Iphone 15', 'book', 'Samsung S22'].map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
