import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight2 } from 'iconsax-react';
import { useDispatch } from 'react-redux';

import Button from '@/components/ui/Button';
import CategoryLayout from '@/components/Layout/category-layout';
import star1 from '../../public/assets/images/stars/star1.svg';
import star2 from '../../public/assets/images/stars/star2.svg';
import dummyImage from '../../public/assets/dummyImage.jpg'
import SEO from '@/components/SEO';
import { addItemToCart, addItemToWishList, fetchSimilarProducts, getProductDetail } from '@/http/marketplace';
import Loader from '@/components/ui/Loader';
import Slider from './component/slider';
import ProductCardWrapper from './component/landingpage/productCardWrapper/productCardWrapper';
import useAuthMutation from '@/hooks/Auth/useAuthMutation';
import { addItemToCartState } from '@/features/cart/cartSlice';
import { addItemToWishListState } from '@/features/wishlist/wishlistSlice';
import { notify } from '@/components/ui/Toast';


function ProductDetails({ productId }: { productId: string }) {
    const dispatch = useDispatch()

    const { isLoading: isProductsDetailsLoading, data: ProductDetail } = useQuery(
        ['product-detail', productId],
        async () => getProductDetail(productId)
    )

    const { isLoading: isSimilarProductsLoading, data: SimilarProducts } = useQuery(
        ['similar-products', productId],
        async () => fetchSimilarProducts(productId)
    )

    // ADD TO CART
    const { mutate: addItemToMyCart, isLoading: isAddItemToMyCartLoading } = useAuthMutation(addItemToCart(productId), {
		onSuccess: (data) => onAddItemToMyCartSuccess(data),
		onError: (error) => onAddItemToMyCartError(error),
	});

    const onAddItemToMyCartSuccess = (data: any) => {
        console.log("Item Added", data);
        dispatch(addItemToCartState({id: productId, name: ProductDetail?.data?.name, quantity: 1, price: ProductDetail?.data?.price}))

        notify({
			message: 'Product Added to Cart Successfully',
			type: 'success',
			theme: 'light',
		});
	};

	const onAddItemToMyCartError = (error: any) => {
		console.log(error);
        notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

    function addToCart(event: any): void {
        addItemToMyCart(productId)
    }

    // ADD TO WISH LIST
    const { mutate: addItemToMyWishList, isLoading: isAddItemToMyWishListLoading } = useAuthMutation(addItemToWishList(productId), {
		onSuccess: (data) => onAddItemToMyWishListSuccess(data),
		onError: (error) => onAddItemToMyWishListError(error),
	});

    const onAddItemToMyWishListSuccess = (data: any) => {
        console.log("Item Added", data);
        dispatch(addItemToWishListState({id: productId, name: ProductDetail?.data?.name, price: ProductDetail?.data?.price}))

        notify({
			message: 'Product Added to WishList Successfully',
			type: 'success',
			theme: 'light',
		});
	};

	const onAddItemToMyWishListError = (error: any) => {
		console.log(error);
        notify({
			message: error.message,
			type: 'error',
			theme: 'light',
		});
	};

    function addToWishList(event: any): void {
        addItemToMyWishList(productId)
    }

    const [image, setImage] = useState(`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_thumbnail}`)
    
    useEffect(() => {
        if (ProductDetail) {
            setImage(`https://res.cloudinary.com/dqvscwcgk/${ProductDetail.data.product_thumbnail}`);
        }
    }, [ProductDetail]);

    console.log(`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data.product_thumbnail}`)

    const updateImage = (newImage: any) => {
        setImage(newImage);
    };

    const renderRatingStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        const starType = i <= rating ? 'star1' : 'star2';
        stars.push(<Image src={starType === 'star1' ? star1 : star2} alt={`Star ${i}`} key={i} />);
        }
        return stars;
    };

    const product_images: (string | StaticImageData)[] = []
    product_images.push(ProductDetail?.data?.product_image2 ? (`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_image2}`) : dummyImage)
    product_images.push(ProductDetail?.data?.product_image2 ? (`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_image3}`) : dummyImage)
    product_images.push(ProductDetail?.data?.product_image2 ? (`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_image4}`) : dummyImage)
    product_images.push(ProductDetail?.data?.product_image2 ? (`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_image5}`) : dummyImage)
    product_images.push(ProductDetail?.data?.product_image2 ? (`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_image6}`) : dummyImage)

    return (
        <div>
            <SEO title='Marketplace - ' description='U2R marketplace - Browse Product Details.' image="" url="" />
            <CategoryLayout>
                {isProductsDetailsLoading ? (
                    <div className="animate-pulse h-[50vh] w-full flex justify-center items-center text-4xl text-gray-400">
                        <Loader />
                    </div>
                ) : (
                    <main className="flex flex-col items-center max-w-[1240px] mx-auto lg:px-0 px-4 lg:pt-6 pt-4 lg:pb-6 pb-4">
                        {/* Product Details  */}
                        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-6 w-full">
                            {/* Product Detail Images  */}
                            <div className="flex flex-col w-full item-center lg:gap-y-4 md:gap-y-2 gap-y-3 gap-x-10 mx-auto pb-6">
                                <Image
                                    src={image}
                                    width={500}
                                    height={500}
                                    alt="Main Image"
                                    className="w-full lg:h-[520px] md:h-[600px] h-[340px] object-cover lg:rounded-3xl rounded-lg"
                                />
                                <Slider 
                                    updateImage={updateImage}
                                    slider0={`https://res.cloudinary.com/dqvscwcgk/${ProductDetail?.data?.product_thumbnail}`}
                                    images={product_images}
                                    visibleCount={product_images.length}
                                />
                            </div>
                            {/* Product Detail Data */}
                            <div className="space-y-6 w-full">
                            <h1 className="sm:text-4xl text-base font-semibold font-manropeEB md:leading-[44px] leading-[24px] tracking-tighter">
                                {ProductDetail?.data?.name}
                            </h1>

                            <div>
                                <p className="lg:hidden block sm:text-2xl text-sm sm:leading-8 leading-5 font-semibold">Description</p>
                                <p className="text-base font-semibold font-manropeL leading-normal tracking-tight flex flex-col">
                                {ProductDetail?.data?.description} <b className="text-green-600 hidden">Read More...</b>
                                </p>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                {ProductDetail?.data?.rating ? (
                                <div className="flex gap-x-1">
                                    <p className=" text-base font-semibold font-manropeB leading-normal tracking-tight">
                                    {`${ProductDetail?.data?.rating}/5`}
                                    </p>
                                    {renderRatingStars(ProductDetail?.data?.rating)}
                                    <p className="text-black text-base font-normal font-manropeL leading-normal tracking-tight">
                                    (50 Customers)
                                    </p>
                                </div>
                                ) : (
                                <div className="flex flex-wrap items-center">
                                    <Image src={star2} alt="rating star" />
                                    <Image src={star2} alt="rating star" />
                                    <Image src={star2} alt="rating star" />
                                    <Image src={star2} alt="rating star" />
                                    <Image src={star2} alt="rating star" />
                                    <p>(no ratings for this product)</p>
                                </div>
                                )}
                            </div>

                            <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden" />

                            <div className="flex flex-col gap-y-2 lg:pb-10 pb-0">
                                <p className="text-base font-normal font-manropeL leading-normal tracking-tight">
                                Total Payment (Incl. taxes)
                                </p>
                                <p className="flex gap-x-4 items-center">
                                <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">
                                    {ProductDetail?.data?.discount_price === '0.00'
                                    ? (ProductDetail?.data?.price)
                                    : (ProductDetail?.data?.discount_price)}
                                </span>
                                <span className="text-[22px] font-normal font-manrope line-through leading-7 text-gray-300">
                                    {ProductDetail?.data?.discount_price === '0.00' ? null : (ProductDetail?.data?.price)}
                                </span>
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col gap-[10px] font-normal font-base leading-6">
                            <Button
                                className="md:px-14 sm:w-fit w-full font-normal text-base leading-6 rounded-lg tracking-[0.08px]"
                                disabled={false}
                                intent={'primary'}
                                size={'lg'}
                                onClick={addToCart}
                                isLoading={isAddItemToMyCartLoading}
                            >
                            Add to cart
                            </Button>
                            <Button
                                className="lg:px-6 md:px-14 sm:w-fit w-full font-normal text-base leading-6 rounded-lg text-custom-color11 tracking-[0.08px]"
                                rightIcon={<ArrowRight2 color="#64D1FF" />}
                                intent={'secondary'}
                                size={'lg'}
                                onClick={addToWishList}
                                isLoading={isAddItemToMyWishListLoading}
                            >
                                Add to Wishlist
                            </Button>
                        </div>
                        <ProductCardWrapper
                            title="Similar Products"
                            productsList={{ isLoading: isSimilarProductsLoading, items: SimilarProducts }}
                            showTopPicks={false}
                            showAll={false}
                            allProducts={false}
                            filter={false}
                            admin={{status: false, shopId: "", companyId: ""}}
                        />
                        {/* <pre>{JSON.stringify(ProductDetail, null, 2)}</pre> */}
                    </main>
                )}
            </CategoryLayout>
        </div>
    )
}

export default ProductDetails
