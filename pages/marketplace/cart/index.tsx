import React, { use, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import SEO from "@/components/SEO";
import CategoryLayout from '@/components/Layout/category-layout';
import Loader from '@/components/ui/Loader';
import { fetchRecentlyViewed, getCartItems, getUserCart } from '@/http/marketplace';
import withAuth from '@/helpers/withAuth';
import Summary from './components/Summary';
import CartItem from './components/cart-item';
import ProductCardWrapper from '@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper';
import Button from '@/components/ui/Button';
import { BiTrash } from 'react-icons/bi';
import ClearYourCart from './components/Clearcart';
import Empty from '@/components/empty/empty';
import { useDispatch } from 'react-redux';
import { setInitialCart } from '@/features/cart/cartSlice'

function UserCart() {
    const dispatch = useDispatch()
    const [modalClosed, setModalClosed] = useState('hidden');

    const {isLoading: isUserCartLoading, data: UserCart } = useQuery(["user-Cart"], getUserCart);
    const {isLoading: isCartItemsLoading, data: CartItems } = useQuery(["Cart-items"], getCartItems);
    const { isLoading: isRecentlyViewedLoading, data: RecentlyViewedData } = useQuery(['recently_Viewed'], fetchRecentlyViewed)

    useEffect (() => {
        if (CartItems?.data) {
            const initialCartItems = CartItems?.data.map((cartItem: any) => ({
                id: cartItem.id,
                name: cartItem.product_details.name,
                quantity: cartItem.quantity,
                price: cartItem.product_details.price
            }));

        dispatch(setInitialCart(initialCartItems))
        }
    })
    

    const clearCartItems = () => {
        setModalClosed('block');
    };

    const closeModal = () => {
        setModalClosed('hidden');
    };

    return (
        <>
            <SEO title='Marketplace - Cart' description='U2R marketplace - User Cart.' image="" url="" />
            <div className={modalClosed}>
                <ClearYourCart closeModal={closeModal}/>
            </div>
            <CategoryLayout>
                {isUserCartLoading?(
                <div className="h-[550px]">
                    <Loader/>
                </div>
                ) : (
                    <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
                    {UserCart?.summary.count? (
                        <>
                        <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
                            <div className="w-full flex flex-col justify-center md:w-full lg:justify-normal lg:w-4/5 ">
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-2xl font-manropeEB">Shopping Cart ({UserCart?.summary.count}) </h1>
                                    <div>
                                        <Button
                                        onClick={clearCartItems}
                                        className="group relative w-[130px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mb-2"
                                        >
                                            <div className="absolute inset-0 w-[0px] bg-[red] group-hover:w-full"></div>
                                            <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
                                                <BiTrash />
                                                <span>&nbsp;Clear Cart</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                {(UserCart?.summary.count > 0 && !isCartItemsLoading
                                    ? CartItems?.data.map((cartItem: any, index: React.Key | null | undefined) => (
                                        <CartItem
                                            key={index}
                                            itemId={cartItem.id}
                                            productId={cartItem.product}
                                            productTitle={cartItem.product_details.name}
                                            productDescription={cartItem.product_details.description}
                                            productImage={cartItem.image}
                                            productPrice={cartItem.product_details.price}
                                            productDiscount={cartItem.product_details.discount_price}
                                            productQuantity={cartItem.quantity}
                                        />
                                        ))
                                    : null )}
                            </div>
                            <div className="flex md:flex-none justify-center lg:w-[35%] md:mx-0">
                                <Summary summary={UserCart?.summary} delivery_address={UserCart?.delivery_address}/>
                            </div>
                        </section>

                        {true && (
                            <section className="w-full flex flex-col mt-[50px] mb-[10%]">
                                <div
                                    className="w-full flex flex-row overflow-scroll lg:min-h-[200px] gap-x-8 md:overflow-hidden 
                                    lg:items-center lg:justify-normal 
                                    md:flex-row md:justify-center md:flex-wrap md:gap-x-4 gap-y-4 lg:gap-x-4 mt-4 "
                                >
                                    <ProductCardWrapper
                                        title="Recently Viewed"
                                        productsList={{ isLoading: isRecentlyViewedLoading, items: RecentlyViewedData }}
                                        showTopPicks={false}
                                        showAll={false}
                                        allProducts={false}
                                        filter={false}
                                        admin={{status: false, shopId: "", companyId: ""}}
                                    /> 
                                </div>
                            </section>
                        )}
                        </>
                    ) : (
                        <Empty
                            title="Your Cart is Empty" 
                            message="Looks like you haven’t added anything to Your Cart yet."
                        />
                    )}
                    </main>
                )}
            </CategoryLayout>
        </>
    )
}

export default withAuth(UserCart);