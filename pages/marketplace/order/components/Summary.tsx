import Button from '@/components/ui/Button';
import { SummaryProp } from '@/@types';
import Link from 'next/link';
import React, { useState } from 'react';
import PaymentInformationModal from './PaymentInformationModal';
import AddressModal from './deliveryAddressModal';

const Summary = ({ summary, delivery_address }: {summary: SummaryProp, delivery_address: string}) => {
  const [addressModalClosed, setAddressModalOpen] = useState('hidden');
  const [paymentModalClosed, setPaymentModalOpen] = useState('hidden');
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null

  const closePaymentModal = () => {
    setPaymentModalOpen('hidden');
  };

  const handleCheckoutClick = () => {
    setPaymentModalOpen('block');
  };

  const closeAddressModal = () => {
    setAddressModalOpen('hidden')
  }

  const handleChangeAddress = () => {
    setAddressModalOpen('block')
  }

  return (
    <section className="flex lg:pl-10 lg:pr-0 py-8 lg:w-full md:w-1/2">
      <div className="cart-summary_wrapper flex flex-col w-[350px] space-y-6 lg:w-full md:w-full">
        <div className="cart-summary__header border border-[#EBEEEF] rounded-md shadow-sm ">
          <h1 className="font-bold capitalize text-xl px-4 py-4 ">cart summary</h1>
          <hr className="border-b-1 border-[#EBEEEF]" />
          <div className="cart-summary__details cart-summary__header border border-[#EBEEEF] rounded-md px-6 py-8 shadow-sm">
            <div className="cart-summary__prices flex flex-col space-y-3">
              <div className="sum flex justify-between">
                <p className="font-bold">Subtotal</p>
                <span className="text-gray-500">{summary?.currency || "ETB"} {summary?.sub_total}</span>
              </div>

              <div className="sum flex justify-between">
                <p className="font-bold">Discount</p>
                <span className="text-green-500 transition-all duration-300">-{summary?.currency || "ETB"} {summary?.total_discount}</span>
              </div>

              <div className="sum flex justify-between">
                <p className="font-bold">Vat</p>
                <span className="text-brand-red-primary transition-all duration-300">
                  +{summary?.currency || "ETB"} {summary?.vat}
                </span>
              </div>
            </div>

            <hr className="border-b-5 border-[#EBEEEF] my-4 mx-3" />

            <div className="cart-total">
              <div className="sum flex justify-between">
                <p className="font-bold">Total:</p>
                <span className="font-bold text-xl transition-all duration-300">
                  {summary?.currency || "ETB"} {summary?.total}
                </span>
              </div>
            </div>

            <hr className="border-b-5 border-[#EBEEEF] my-4 mx-3" />

            <div className="flex justify-between items-center">
              <div className='flex flex-col'>
                <p className="font-bold min-w-[150px]">Delivery address:</p>
                <h6 onClick={handleChangeAddress} className='text-[14px] text-dark-900 hover:underline'>change address</h6>
              </div>
              {delivery_address ? (
                  <span className="text-sm text-right h-auto max-w-[200px] --font-manropeL break-words overflow-hidden">
                    {delivery_address}
                  </span>
                ) : (
                  <Link href="">
                    <span className="text-sm hover:underline h-auto max-w-[200px] --font-manropeL break-words overflow-hidden">
                      Please insert Delivery Address
                    </span>
                  </Link>
                ) 
              }
            </div>

            <div>
              <Button
                intent={'primary'}
                className='w-full mt-4'
                onClick={handleCheckoutClick}
              >
                Checkout
              </Button>
            </div>
          </div>
          <div className={paymentModalClosed}>
            <PaymentInformationModal token={token? token : ""} orderTotal={(summary?.total)} closeModal={closePaymentModal} />
          </div>
          <div className={addressModalClosed}>
            <AddressModal closeModal={closeAddressModal} delivery_address={delivery_address} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
