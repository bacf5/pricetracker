'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';
import React from 'react';

const isValidPadelURL = (url: string) => {
  // Implement your logic to validate the url

  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if the hostname contains "padel"

    if (hostname.includes('padelnuestro.com') || hostname.includes('padelnuestro')) return true;
  } catch (error) {
    return false;
  }
  return false;
};

const SearchBar = () => {
  const [searchLink, setSearchLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidPadelURL(searchLink);

    // alert(isValidLink ? 'Link Válido' : ' Link Inválido');

    if (!isValidLink) return alert('Asegurate que el link sea de padelnuestro.com');

    try {
      setIsLoading(true);

      // Scrape the product details from the link
      const product = await scrapeAndStoreProduct(searchLink);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchLink}
        onChange={(e) => setSearchLink(e.target.value)}
        placeholder="Link del producto"
        className="searchbar-input"
      />

      <button type="submit" className="searchbar-btn" disabled={searchLink === ''}>
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
};

export default SearchBar;
