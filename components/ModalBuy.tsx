'use client';

import { FormEvent, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import Image from 'next/image';
// import { addUserEmailProduct } from '@/lib/actions';

interface Props {
  productImg: string;
}

export const ModalBuy = ({ productImg }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn flex" onClick={openModal}>
        Comprar producto 🛍️
      </button>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true" />
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3  rounded-10">
                      <Image src="/assets/icons/logo.svg" alt="logo" height={50} width={50} />
                    </div>
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                  <h4 className="dialog-head_text">Todavía no tenemos implementada esta función :(</h4>
                  <p className="text-sm text-gray-600 mt-2">Te vamos a avisar cuando esté disponible.</p>

                  <div className="trending-card_img-container">
                    <Image
                      src={productImg}
                      alt="Foto pala a seguir"
                      width={75}
                      height={75}
                      className="trending-card_img border border-[#fe612392] border-opacity-50 rounded-[17px]"
                    />
                  </div>
                </div>
                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex">
                    Dejanos tu mail <Image src="/assets/icons/arrow-right.svg" alt="arrow" width={16} height={16} className="ml-1" />
                  </label>
                  <div className="dialog-input_container">
                    <Image src="/assets/icons/mail.svg" alt="mail" width={18} height={18} />
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="Ingresá tu correo electrónico"
                      className="dialog-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// function addUserEmailToProduct(productId: any, email: string) {
//   throw new Error('Function not implemented.');
// }
