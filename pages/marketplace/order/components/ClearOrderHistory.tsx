import React from 'react';
import Image from 'next/image';
import router from 'next/router';

import trash from '../../../../public/assets/images/cart/delete.svg';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { clearUserCart } from '@/http/marketplace';
import { notify } from '@/components/ui/Toast';
import remove from '../../../../public/assets/remove-icon.jpg';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { clearOrder } from '@/features/order/orderSlice';

interface ClearOrderHistoryProps {
  closeModal: () => void;
}

const ClearYourOrderHistory: React.FC<ClearOrderHistoryProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient();
  
  const { mutate: ClearOrderHistory } = useAuthMutation(clearUserCart(), {
		onSuccess: (data) => {
      onDeleteCartItemSuccess(data),
      queryClient.invalidateQueries(['Cart-items']);
      queryClient.invalidateQueries(['user-Cart']);      
    },
		onError: (error) => onDeleteCartItemError(error),
	});

  const onDeleteCartItemSuccess = (data: any) => {
			console.log(data);
      dispatch(clearOrder())
			router.push('/marketplace/order/');

		notify({
			message: 'Order History Cleared Successfully',
			type: 'success',
			theme: 'light',
		});
	};

	const onDeleteCartItemError = (error: any) => {
		console.log(error);
		notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
      <div id="modal" className="bg-white-100 p-4 rounded-lg w-[90%] md:w-[50%] lg:w-[24%] h-415 text-center ">
        <svg onClick={closeModal} className="ml-auto mr-1 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: 'pointer' }}>
          <path d="M18 6.5L6 18.5M6 6.5L18 18.5" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <div className="flex justify-center">
            <Image src={remove} alt="checked" width={100} height={100} />
          </div>
          {/* Modal content */}
          <h2 className="text-[18px] font-bold pt-2 text-[#101828]">Clear Order History</h2>
          <p className="text-[#475467] text-[14px] font-normal mt-4 mb-2">
            Are you sure you want to remove all items from your Order History?
          </p>
        </div>
        {/* Buttons */}
        <div className="flex flex-row items-between justify-center mt-5">
          <button
            className="px-4 py-2 bg-[#DE3730] text-[#FFFFFF] hover:font-bold text-[14px] flex items-center gap-2 rounded-md ml-4"
            onClick={() => {
              closeModal();
              ClearOrderHistory();
            }}
          >
            <Image src={trash} alt="checked" width={20} height={20} />
              Clear Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearYourOrderHistory;
