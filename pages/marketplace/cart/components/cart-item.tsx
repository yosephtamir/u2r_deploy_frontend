import { CartItemProps } from '@/@types';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiRefresh, BiTrash } from 'react-icons/bi';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';

import RemoveCart from './Removecart';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { updateQuantity } from '@/http/marketplace';
import { notify } from '@/components/ui/Toast';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantityState } from '@/features/cart/cartSlice'

export default function CartItem({
  itemId,
  productId,
  productImage,
  productTitle,
  productDescription,
  productDiscount,
  productPrice,
  productQuantity,
}: CartItemProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [modalClosed, setModalClosed] = useState('hidden');
  const [quantity, setQuantity] = useState(String(productQuantity));



  const { mutate: updateCartItemQuantity, isLoading: isUpdateQuantityLoading } = useAuthMutation(updateQuantity(productId), {
		onSuccess: (data) => {
      onUpdateQuantitySuccess(data),
      queryClient.invalidateQueries(['Cart-items']);
      queryClient.invalidateQueries(['user-Cart']);
    },
		onError: (error) => onUpdateQuantityError(error),
	});

  const onUpdateQuantitySuccess = (data: any) => {
    dispatch(updateCartItemQuantityState({id: productId, quantity: quantity}))
		console.log(data);
    notify({
      message: 'Quantity updated successfully!',
      type: 'success',
      theme: 'light',
    });
	};

	const onUpdateQuantityError = (error: any) => {
    console.error(error);
    notify({
      message: 'Failed to update quantity. Please try again later.',
      type: 'error',
      theme: 'light',
    });
  };


  const updateQuantityInCart = () => {
    const quantityToUpdate = parseInt(quantity, 10);
    
    if (!isNaN(quantityToUpdate) && quantityToUpdate > 0) {
      updateCartItemQuantity({ "quantity": quantityToUpdate });
      // Invalidate the 'user-Cart' query to trigger a re-fetch
      queryClient.invalidateQueries(['user-Cart']);
    } else {
      notify({
        message: 'Invalid quantity.',
        type: 'error',
        theme: 'light',
      });
    }
  };

  const removeItem = () => {
    setModalClosed('block');
  };

  const closeModal = () => {
    setModalClosed('hidden');
  };

  const increaseQuantity = () => {
    const newQuantity = String(Number(quantity) + 1);
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    const newQuantity = String(Math.max(1, Number(quantity) - 1));
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (event: { target: { value: any; }; }) => {
    const inputValue = event.target.value;
    const newQuantity = parseInt(inputValue, 10);

    if (inputValue === '') {
      setQuantity(''); // Just update the local state, no API call yet
    } else if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(String(newQuantity));
    }
  };

  return (
    <>
      <div className={modalClosed}>
        <RemoveCart productId={productId} closeModal={closeModal}/>
      </div>
      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
        <div className="md:max-w-[300px] w-[100%] h-[220px] md:h-[209px] overflow-hidden">
          <Link href={`/marketplace/product-details/${productId}`}>
            <Image
              width={0}
              height={0}
              src={productImage}
              alt={productTitle}
              style={{ height: '100%', width: '100vw' }}
              sizes="100vw"
              className="rounded-[8px] object-cover h-[100%] w-[100%]"
            />
          </Link>
        </div>
        <div className="flex flex-col mt-3 md:mt-0 md:w-2/4">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] text-truncate md:mt-4 leading-6 font-manropeL">
            {productDescription?.length > 100 ? `${productDescription.slice(0, 100)}...` : productDescription}
          </p>
          {productDiscount !== null ? (
            <div className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">
              <span>ETB {productDiscount ? (productPrice - productDiscount) : null}</span>
              <span className="ms-[30px] line-through text-gray-300">ETB {productPrice}</span>
            </div>
          ) : (
            <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">ETB {productPrice}</p>
          )}
        </div>
        <div className="md:mt-3 md:ml-auto md:flex md:flex-col md:items-center">
          <div>
            <Button
              id={productId}
              onClick={removeItem}
              className="group relative w-[100px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mb-2"
            >
              <div className="absolute inset-0 w-[0px] bg-[red] group-hover:w-full"></div>
              <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
                <BiTrash />
                <span>&nbsp;Remove</span>
              </div>
            </Button>
          </div>
          <div className="flex items-center w-[100%] border border-[#d5dbdd] rounded-md">
            <button
              onClick={decreaseQuantity}
              className="flex items-center justify-center w-[20%] h-[40px] bg-red-50 rounded-l-md"
            >
              <AiOutlineMinus />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-[60%] h-[40px] flex items-center justify-center text-center"
              placeholder='1'
            />
            <button
              onClick={increaseQuantity}
              className="flex items-center justify-center w-[20%] h-[40px] bg-green-50 rounded-r-md"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div>
            <Button
              id={productId}
              onClick={updateQuantityInCart}
              isLoading={isUpdateQuantityLoading}
              className="group relative w-[100px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mt-2"
            >
              <div className="absolute inset-0 w-[0px] bg-[green] group-hover:w-full"></div>
              <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
                <BiRefresh />
                <span>&nbsp;Update</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
