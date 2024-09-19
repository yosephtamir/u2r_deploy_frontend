import React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/ui/Button';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { notify } from '@/components/ui/Toast';
import { updateDeliveryAddressDetails } from '@/http/marketplace';

const AddressModal = ({closeModal, delivery_address}: {closeModal: () => void, delivery_address: string}) => {
    const queryClient = useQueryClient();
    const { mutate: EditAddress, isLoading: isEditAddressLoading } = useAuthMutation(updateDeliveryAddressDetails(), {
        onSuccess: (data) => {
            onEditShopSuccess(data),
            queryClient.invalidateQueries(['user-Cart']);
        },
        onError: (error) => onEditShopError(error),
    });
    
    const schema = z.object({
        delivery_address: z.string().min(1, { message: 'Delivery Address is Required.' }),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            delivery_address: delivery_address,
        },
    });

    const handleEdit = async (values: { delivery_address: string }) => {
        EditAddress(values);
        console.log('Sending update request:', values);
    };

    const onEditShopSuccess = (data: { status: number; }) => {
        console.log(data)
        notify({
            message: 'Delivery Address Edited Successfully',
            type: 'success',
            theme: 'light',
        });
    };

    const onEditShopError = (error: any) => {
        console.log(error);
        notify({
            message: error.message,
            type: 'error',
            theme: 'light',
        });
    };

    return (
      <>
        <div className=" fixed  inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
          <div className="bg-white-100 p-12 rounded-lg  w-[90%] md:w-[55%] lg:w-[28%] animate-slideIn">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[30px] font-manropeB leading-[27.04px] font-semibold text-gray-700">Delivery Address</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="flex flex-col gap-6" encType="multipart/form-data" onSubmit={form.onSubmit((values) => handleEdit(values))}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="delivery_address" className="font-manropeB leading-[27.04px] font-semibold text-gray-700">
                    Enter Delivery Address
                    </label>
                    <textarea
                        placeholder="Your Delivery Address Here"
                        id="delivery_address"
                        inputMode="none"
                        {...form.getInputProps('delivery_address')}
                        className={`w-full border text-black h-[200px] md:h-[120px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] p-2 rounded-md ${form.errors.delivery_address ? 'border-red-200' : 'border-slate-50'}`}                  
                    />
                    <p className="text-[red] text-xs">{form.errors.delivery_address && form.errors.delivery_address}</p>
                    <Button
                        isLoading={isEditAddressLoading}
                        intent={'primary'}
                        size={'md'}
                        className='w-full'
                        type="submit"
                    >
                        Change Delivery Address
                    </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

export default AddressModal;
