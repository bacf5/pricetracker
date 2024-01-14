import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const navIcons = [
  { src: 'assets/icons/search.svg', alt: 'Search' },
  { src: 'assets/icons/black-heart.svg', alt: 'Black Heart' },
  { src: 'assets/icons/user.svg', alt: 'User' },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="assets/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo"
          />
          <p className="nav-logo">
            Price<span className="text-primary">Tracker</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon, index) => (
            <Image
              key={index}
              src={icon.src}
              width={28}
              height={28}
              alt={icon.alt}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
