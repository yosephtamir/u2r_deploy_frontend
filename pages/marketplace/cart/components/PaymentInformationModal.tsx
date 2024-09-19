import React, { useState } from 'react';
import Image from 'next/image';

import chapa from '../../../../public/assets/images/paymant/chapa.jpeg'
import paypal from '../../../../public/assets/images/paymant/Paypal.jpg'
import telebirr from '../../../../public/assets/images/paymant/telebirr.jpeg'
import Button from '@/components/ui/Button';
import { sleep } from '@/helpers';

const PaymentInformationModal = ({closeModal, orderTotal, token}: {
  closeModal: () => void;
  orderTotal: number | string;
  token: string;
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentMethodError, setPaymentMethodError] = useState('');
  const [paymentButtonClicked, setPaymentButtonClicked] = useState(false);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
    setPaymentMethodError('');
  };

  const handlePayment = async () => {
    setPaymentButtonClicked(true);
    if (selectedPaymentMethod) {
        localStorage.setItem('trans_token', token);
        localStorage.setItem('gateway', selectedPaymentMethod);
      }
    sleep(20)
    setPaymentButtonClicked(false);
    }

    return (
      <>
        <div className=" fixed  inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
          <div className="bg-white-100 p-12 rounded-lg  w-[90%] md:w-[55%] lg:w-[28%] animate-slideIn">
          <svg onClick={closeModal} className="ml-auto mr-1 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: 'pointer' }}>
            <path d="M18 6.5L6 18.5M6 6.5L18 18.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

            <h1 className="text-lg font-semibold mb-6 font-manropeB">Choose Payment Method</h1>

            <div className="flex items-center justify-between p-3 border border-[#E1E3E2] shadow-md rounded-md">
              <span>Order Total</span>
              <span className="text-dark-100 font-bold">Birr {orderTotal}</span>
            </div>

            <div className="relative w-full">
              <h3 className="mt-4 mb-2">Select payment method</h3>

              <div className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-2 mb-4">
                <label className="inline-flex items-center flex-grow">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 "
                    name="paymentMethod"
                    value="chapa"
                    checked={selectedPaymentMethod === 'chapa'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Pay with Chapa </span>
                </label>
                <Image src={chapa} alt="paystack" width={64} height={64} />
              </div>
              <div className="flex items-center justify-between w-full border rounded-lg p-2 mb-4 border-[#E1E3E2]">
                <label className="inline-flex items-center flex-grow">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 "
                    name="paymentMethod"
                    value="paypal"
                    checked={selectedPaymentMethod === 'paypal'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Pay with PayPal </span>
                </label>
                <Image src={paypal} alt="mastercard" width={76} height={76} />
              </div>
              <div className="flex items-center justify-between w-full border rounded-lg p-2 mb-4 border-[#E1E3E2]">
                <label className="inline-flex items-center flex-grow">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-indigo-600 "
                    name="paymentMethod"
                    value="telebirr"
                    checked={selectedPaymentMethod === 'telebirr'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span className="ml-2">Pay with Telebirr </span>
                </label>
                <Image src={telebirr} alt="mastercard" width={76} height={76} />
              </div>
              {paymentMethodError && <div className="text-brand-red-primary mb-4">{paymentMethodError}</div>}
            </div>
            {paymentButtonClicked ? (
              <Button
                intent={'primary'}
                disabled
                className='w-full'
              >
                <svg className="animate-spin h-4 w-4 inline mr-2 text-[#f5f6f1]" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" />
                </svg>
                Processing Payment...
              </Button>
            ) : (
              <Button
                onClick={handlePayment}
                intent={'primary'}
                className='w-full'
              >
                Proceed to pay
              </Button>
            )}

            <p className="text-center text-sm mt-4">
              This is an encrypted payment, your details are 100% secured and safe
            </p>
          </div>
        </div>
      </>
    );
  }

export default PaymentInformationModal;
