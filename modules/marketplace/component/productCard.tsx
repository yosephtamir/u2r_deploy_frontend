import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useQueryClient } from '@tanstack/react-query';

import Button from "@/components/ui/Button";
import addIcon from '../../../public/assets/images/add.svg'
import deleteIcon from '../../../public/assets/images/trash.svg'
import editIcon from '../../../public/assets/images/edit.svg'
import likesIcon from '../../../components/Navbar/assets/heart-add.svg';
import isAuthenticated from "@/helpers/isAuthenticated";
import useAuthMutation from "@/hooks/Auth/useAuthMutation";
import { addItemToCart, addItemToWishList } from "@/http/marketplace";
import { notify } from "@/components/ui/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartState } from "@/features/cart/cartSlice";
import DeleteProduct from "@/pages/shops/manage/[shopId]/components/DeleteProduct";
import EditProductPopupForm from "@/modules/shops/components/editProductPopup";

import Star0 from '../../../public/assets/images/stars/Star-00.png';
import Star0_5 from '../../../public/assets/images/stars/Star-0.5.png';
import Star1 from '../../../public/assets/images/stars/Star-01.png';
import Star1_5 from '../../../public/assets/images/stars/Star-1.5.png';
import Star2 from '../../../public/assets/images/stars/Star-02.png';
import Star2_5 from '../../../public/assets/images/stars/Star-2.5.png';
import Star3 from '../../../public/assets/images/stars/Star-03.png';
import Star3_5 from '../../../public/assets/images/stars/Star-3.5.png';
import Star4 from '../../../public/assets/images/stars/Star-04.png';
import Star4_5 from '../../../public/assets/images/stars/Star-4.5.png';
import Star5 from '../../../public/assets/images/stars/Star-05.png';


interface MarketPlaceProductCardProps {
    id: string;
    currency: string;
    image: string | null;
    name: string;
    price: number;
    user: string;
    rating: number;
    showLimitedOffer?: boolean;
    showTopPicks?: boolean;
    showDiscount?: boolean;
    discount_price?: number;
    shop?: {
        id: string;
        name: string;
    };
    admin: {
        status: boolean;
        shopId: any;
        companyId: any;
    };
};

function ProductCard({
    image,
    name,
    price,
    user,
    rating,
    showLimitedOffer,
    showTopPicks,
    showDiscount,
    discount_price,
    id,
    currency,
    shop,
    admin
}: MarketPlaceProductCardProps) {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    const { mutate: AddToCart, isLoading: isAddToCartLoading } = useAuthMutation(addItemToCart(id), {
		onSuccess: (data) => {
            onAddToCartSuccess(data),
            queryClient.invalidateQueries(['Cart-items']);
            queryClient.invalidateQueries(['user-Cart']);
        },
		onError: (error) => onAddToCartError(error),
	});

    const onAddToCartSuccess = (data: any) => {
        console.log(data);
        dispatch(addItemToCartState({id: id, name: name, quantity: 1, price: price}))
		notify({
			message: 'Product Added To Cart',
			type: 'success',
			theme: 'light',
		});
	};

	const onAddToCartError = (error: any) => {
		console.log(error);
		notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

    const { mutate: AddToWishlist, isLoading: isAddToWishlistLoading } = useAuthMutation(addItemToWishList(id), {
		onSuccess: (data) => onAddToWishlistSuccess(data),
		onError: (error) => onAddToWishlistError(error),
	});

    const onAddToWishlistSuccess = (data: any) => {
		console.log(data);

		notify({
			message: 'Product Added To Wish List',
			type: 'success',
			theme: 'light',
		});
	};

	const onAddToWishlistError = (error: any) => {
		console.log(error);
		notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

    const productNameTrimmed = name?.slice(0, 30);

    const stars: { [key: number]: { src: StaticImageData; alt: string } } = {
        0: { src: Star0, alt: '0 Stars' },
        0.5: { src: Star0_5, alt: '0.5 Stars' },
        1: { src: Star1, alt: '1 Star' },
        1.5: { src: Star1_5, alt: '1.5 Stars' },
        2: { src: Star2, alt: '2 Stars' },
        2.5: { src: Star2_5, alt: '2.5 Stars' },
        3: { src: Star3, alt: '3 Stars' },
        3.5: { src: Star3_5, alt: '3.5 Stars' },
        4: { src: Star4, alt: '4 Stars' },
        4.5: { src: Star4_5, alt: '4.5 Stars' },
        5: { src: Star5, alt: '5 Stars' },
    };

      const [auth, setAuth] = useState(false);
      useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const isLoggedIn = isAuthenticated(token as string);

        if (isLoggedIn) {
        setAuth(true);
        }
    }, []);

    const starRating = Math.round(rating * 2) / 2;

    function formatPrice(price: number) {
        if (typeof price === 'string') {
            price = parseFloat(price);
        }

        if (isNaN(price)) {
            return price;
        }

        return price.toLocaleString('en-US', {
            useGrouping: true,
            minimumFractionDigits: 2,
        });
    }

    const handleAddToCart = () => {
		AddToCart(id);
	};

    const handleAddToWishlist = () => {
        AddToWishlist(id);
    };

    const [showEditProductPopup, setShowEditProductPopup] = useState(false);
    const toggleEditProductPopup = () => {
        setShowEditProductPopup(!showEditProductPopup);
    };

    const [deleteProductModalClosed, setDeleteProductModalClosed] = useState('hidden');
    const deleteProduct = () => {
        setDeleteProductModalClosed('block');
    };
    const closeDeleteProductModal = () => {
        setDeleteProductModalClosed('hidden');
    };

    return (
        <>
        {showEditProductPopup && 
        <EditProductPopupForm 
          togglePopup={toggleEditProductPopup}
          shopId={admin.shopId}
          productId={id}
          productName={name}
          productPrice={price} 
          currency={currency}
        />}
        <div className={deleteProductModalClosed}>
            <DeleteProduct closeModal={closeDeleteProductModal} companyId={admin.companyId} shopId={admin.shopId} productId={id} />
        </div>
        <div className="p-[16px] border-[1px] border-custom-color32 rounded-[8px] h-full w-[286px] max-w-full min-w-[200px] relative">
            <div className="absolute top-0 right-0 p-2 z-10">
                <button
                    onClick={handleAddToWishlist}
                    className="bg-gray-300 hover:bg-[#fff] rounded-full p-2 transition-all duration-300 ease-in-out"
                    aria-label="Add to Wishlist"
                >
                    <Image src={likesIcon} alt="Add to Wishlist" width={24} height={24} />
                </button>
            </div>
            <div className="flex flex-col h-full items-start">
                {/* Product Image */}
                <Link href={`/marketplace/product-details/${id}`} className="relative flex flex-col">
                    <div>
                        <div>
                            {showTopPicks ? (
                                <div className="absolute w-[100px] h-[36px] bg-[#446076] rounded-[8px] flex items-center justify-center tracking-[0.4%] text-[#ffffff] font-manropeL font-semibold text-[12px]">
                                    Top Picks
                                </div>
                            ) : showDiscount ? (
                                    <div className="absolute w-[100px] h-[36px] bg-[#446076] rounded-[8px] flex items-center justify-center text-[#ffffff] tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                                    {`${discount_price ? Math.floor((discount_price / price) * 100) : 0}% Off`}
                                </div>
                            ) : showLimitedOffer ? (
                                <div className="absolute w-[100px] h-[36px] bg-[#446076] rounded-[8px] flex items-center justify-center text-[#ffffff] tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                                    Limited Offer
                                </div>
                            ) : null}
                        </div>

                        {image ? (
                            <div className="max-w-[300px] w-[100%] h-[120px] md:h-[209px] overflow-hidden">
                                <Image
                                    src={image}
                                    alt={name}
                                    width={0}
                                    height={0}
                                    style={{ height: '100%', width: '100vw' }}
                                    sizes="100vw"
                                    className="rounded-[8px] object-cover h-[100%] w-[100%]"
                                />
                            </div>
                        ) : (
                            <Image
                                src="/assets/dummyImage.jpg"
                                alt="dummy image"
                                width={254}
                                height={209}
                                className="rounded-[8px]"
                            />
                        )}
                    </div>
                </Link>
                {/* Product Name */}
                <p className="font-manropeL mt-[0.5rem] text-brand-green-shade10 w-full text-ellipsis whitespace-nowrap overflow-hidden text-[14px] font-normal leading-[20px] letter tracking-[0.014px] pt-[8px]">
                    {name?.length > 30 ? <span>{productNameTrimmed}...</span> : name}
                </p>
                {/* Product Price */}
                { auth && (
                <h1 className="font-manropeL text-brand-green-shade10 text-[18px] font-bold leading-[20px] letter pt-[2px] pb-[8px]">
                    {`ETB ${formatPrice(price)}`}
                </h1>
                )}
                {/* Product Owner */}
                <p className="font-manropeL text-custom-color15 text-[14px] font-normal leading-[20px] letter tracking-[0.035px] pb-[20px]">
                    By:{' '}
                    <Link href={shop?.id ? `/shop/?shop_id=${shop.id}` : '/shop'} className="underline">
                        {user}
                    </Link>
                </p>
                {/* Star rating */}
                <Link href={`/marketplace/product-details/${id}`}>
                    <div>
                        {starRating ? (
                            <div className="flex flex-row items-center gap-[5px]">
                                <Image src={stars[starRating].src} alt="" width={120} height={25} className="-ml-2" />
                                <p className="font-manropeL font-semibold text-[14px] leading-[20px] tracking-[0.25%] text-custom-color15">{`(${rating})`}</p>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center gap-[5px]">
                                <Image src={stars[0].src} alt="" width={120} height={25} className="-ml-2" />
                                <p>(No Rating Yet)</p>
                            </div>
                        )}
                    </div>
                </Link>
                <div className="pt-[15px] flex flex-col w-[100%] justify-center items-center gap-2">
                    {!admin.status ? (
                    <Button
                        href={`/marketplace/product-details/${id}`}
                        className="text-[14px] rounded-[8px] mb-[2px] w-[100%]"
                        intent={'primary'}
                        size={'md'}
                    >
                        View Item
                    </Button>
                    ) : (
                    <Button
                        className="text-[14px] rounded-[8px] mb-[2px] w-[100%]"
                        rightIcon={<Image src={editIcon} alt="edit Icon" />}
                        intent={'primary'}
                        size={'md'}
                        onClick={toggleEditProductPopup}
                    >
                        Edit Product
                    </Button>
                    )}
                    {!admin.status ? (
                    <Button
                        className="text-[14px] rounded-[8px] mb-[2px] w-[100%]"
                        intent={'secondary'}
                        size={'md'}
                        rightIcon={<Image src={addIcon} alt="Add Icon"/>}
                        isLoading={isAddToCartLoading}
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </Button>
                    ) : (
                    <Button
                        className="text-[14px] rounded-[8px] mb-[2px] w-[100%]"
                        intent={'error'}
                        size={'lg'}
                        rightIcon={<Image src={deleteIcon} alt="Delete Icon" />}
                        isLoading={isAddToCartLoading}
                        onClick={deleteProduct}
                    >
                        Delete Product
                    </Button>
                    )}
                    
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductCard;