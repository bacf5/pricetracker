import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const footerIcons = [
  { src: '/assets/icons/x-social-media.svg', alt: 'X', url: 'https://twitter.com/bcarusofassa' },
  { src: '/assets/icons/github-icon.svg', alt: 'Github', url: 'https://github.com/bacf5/pricetracker' },
];

// min-[300px]:hidden lg:flex
const Footer = () => {
  return (
    <footer className="w-full border-2">
      <div className="footer mt-2">
        <div className="flex items-center gap-4">
          <span className="">Links ♥: </span>
          {footerIcons.map((icon, index) => (
            <Link href={icon.url} key={index}>
              <Image key={index} src={icon.src} width={28} height={28} alt={icon.alt} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
