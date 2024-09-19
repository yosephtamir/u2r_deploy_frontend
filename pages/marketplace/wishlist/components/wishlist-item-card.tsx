import { WishListItemProps } from '@/@types';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

import RemoveFromWishList from './wishlist-item-remove';
import { useDispatch } from 'react-redux';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { addItemToCart } from '@/http/marketplace';
import { addItemToCartState } from '@/features/cart/cartSlice';
import { notify } from '@/components/ui/Toast';

export default function WishListItem({
  itemId,
  productId,
  productImage,
  productTitle,
  productDescription,
  productDiscount,
  productPrice,
  productStatus,
}: WishListItemProps) {
  const dispatch = useDispatch()
  const [modalClosed, setModalClosed] = useState('hidden');

  const removeItem = () => {
    setModalClosed('block');
  };

  const closeModal = () => {
    setModalClosed('hidden');
  };

  const { mutate: addItemToMyCart, isLoading: isAddItemToMyCartLoading } = useAuthMutation(addItemToCart(productId), {
		onSuccess: (data) => onAddItemToMyCartSuccess(data),
		onError: (error) => onAddItemToMyCartError(error),
	});

  const onAddItemToMyCartSuccess = (data: any) => {
    console.log("Item Added", data);
    dispatch(addItemToCartState({id: productId, name: productTitle, quantity: 1, price: productPrice}))

    notify({
			message: 'Product Added to Cart Successfully',
			type: 'success',
			theme: 'light',
		});
	};

	const onAddItemToMyCartError = (error: any) => {
		console.log(error.message);
    notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

  function addToCart(event: any): void {
      addItemToMyCart(productId)
  }

  return (
    <>
      <div className={modalClosed}>
        <RemoveFromWishList productId={productId} closeModal={closeModal}/>
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
        <div className="flex flex-col items-center gap-3 self-start">
          <Button
            id={productId}
            onClick={removeItem}
            className="group relative w-[170px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mb-2"
            rightIcon={<FaSearch />}
          >
            <div className="absolute inset-0 w-[0px] bg-[red] group-hover:w-full"></div>
            <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
              <BiTrash />
              <span>&nbsp;Remove</span>
            </div>
          </Button>
          <Button
            id={productId}
            className={`${productStatus === 'In Stoke' ? 'bg-[green]' : productStatus === 'Low Stoke' ? 'bg-[#00800085]' : 'bg-[red]'} w-[170px] h-[40px] overflow-hidden rounded-md font-manropeB mb-2`}
          >
            <p>
              {productStatus === 'In Stoke' ? 'In Stock' : productStatus === 'Low Stoke' ? 'Low Stock': 'Out of Stock'}
            </p>
          </Button>
          {productStatus === 'In Stoke' || productStatus === 'Low Stoke' ? 
            (
              <Button
                id={productId}
                onClick={addToCart}
                className="w-[170px] h-[40px] rounded-md cursor-pointer bg-brand-Light_Sky_Blue-primary font-manropeB mb-2"
                leftIcon={<FaCartPlus />}
                isLoading={isAddItemToMyCartLoading}
              >
                <div className="relative w-full flex items-center justify-center text-[#fff]">Move to Cart</div>
              </Button>
            ) : (
              <Button
                id={productId}
                onClick={removeItem}
                className="w-[170px] h-[40px] rounded-md cursor-pointer bg-brand-Light_Sky_Blue-primary font-manropeB mb-2"
                leftIcon={<FaSearch />}
              >
                <div className="relative w-full flex items-center justify-center text-[#fff]">Explore Similar</div>
              </Button>
          )}
        </div>
      </div>
    </>
  );
}
