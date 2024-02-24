import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'Search' },
  { src: '/assets/icons/black-heart.svg', alt: 'Black Heart' },
  { src: '/assets/icons/user.svg', alt: 'User' },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/icons/logo.svg" width={50} height={50} alt="Logo" />
          <p className="nav-logo mt-2">
            PRICE
            <span className="bg-gradient-to-r from-primary via-primary-orange to-primary bg-clip-text text-transparent"> TRACKER </span>
          </p>
          <div>
            {' '}
            <Image src="/assets/images/logo-padelnuestro.png" width={175} height={175} alt="Logo padelNuestro" />
          </div>
        </Link>
        <div className="min-[300px]:hidden lg:flex items-center gap-5 pr-5">
          {navIcons.map((icon, index) => (
            <Image key={index} src={icon.src} width={24} height={24} alt={icon.alt} />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
