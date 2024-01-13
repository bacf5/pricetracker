import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
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
            <h1 className="head-text">Unleash the Power of tracking prices</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
