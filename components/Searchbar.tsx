'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isValidPadelURL = (url: string) => {
  // Implement logic to validate the url
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

const Searchbar = () => {
  const [searchLink, setSearchLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const notifyError = () =>
    toast.error('Link Invalido', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  // const notifyOk = () =>
  //   toast('Busqueda terminada ⚡️', {
  //     position: 'top-center',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidPadelURL(searchLink);
    // alert(isValidLink ? 'Link Válido' : ' Link Inválido');
    // Aca puedo poner el toast de react-toastify
    if (!isValidLink) return notifyError();

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
        placeholder="Link del producto de Padel Nuestro"
        className="searchbar-input"
      />
      <ToastContainer stacked />
      <button type="submit" className="searchbar-btn" disabled={searchLink === ''}>
        {isLoading ? `Buscando...` : 'Buscar'}
      </button>
    </form>
  );
};

export default Searchbar;
