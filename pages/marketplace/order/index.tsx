import React, { use, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import SEO from "@/components/SEO";
import CategoryLayout from '@/components/Layout/category-layout';
import Loader from '@/components/ui/Loader';
import { fetchRecentlyViewed, getOrderItems, getUserOrder } from '@/http/marketplace';
import withAuth from '@/helpers/withAuth';
import CartItem from './components/cart-item';
import ProductCardWrapper from '@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper';
import Button from '@/components/ui/Button';
import { BiTrash } from 'react-icons/bi';
import ClearYourOrderHistory from './components/ClearOrderHistory';
import Empty from '@/components/empty/empty';
import { useDispatch } from 'react-redux';
import { setInitialOrder } from '@/features/order/orderSlice';

function UserOrders() {
    const dispatch = useDispatch()
    const [modalClosed, setModalClosed] = useState('hidden');

    const {isLoading: isUserOrdersLoading, data: UserOrders } = useQuery(["user-Order"], getUserOrder);
    const {isLoading: isOrderItemsLoading, data: OrderItems } = useQuery(["Order-items"], getOrderItems);
    const { isLoading: isRecentlyViewedLoading, data: RecentlyViewedData } = useQuery(['recently_Viewed'], fetchRecentlyViewed)

    useEffect (() => {
        if (OrderItems?.data) {
            const initialOrderItems = OrderItems?.data.map((orderItem: any) => ({
                id: orderItem.id,
                name: orderItem.product_details.name,
                quantity: orderItem.quantity,
                price: orderItem.product_details.price
            }));

        dispatch(setInitialOrder(initialOrderItems))
        }
    })
    

    const clearOrderItems = () => {
        setModalClosed('block');
    };
    const closeModal = () => {
        setModalClosed('hidden');
    };

    return (
        <>
            <SEO title='Marketplace - Order History' description='U2R marketplace - Order History.' image="" url="" />
            <div className={modalClosed}>
                <ClearYourOrderHistory closeModal={closeModal}/>
            </div>
            <CategoryLayout>
                {isUserOrdersLoading?(
                <div className="h-[550px]">
                    <Loader/>
                </div>
                ) : (
                    <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
                    {UserOrders?.order_items_count ? (
                        <>
                        <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
                            <div className="w-full flex flex-col justify-center md:w-full lg:justify-normal lg:w-4/5 ">
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-2xl font-manropeEB">Order History ({UserOrders?.order_items_count}) </h1>
                                    <div>
                                        <Button
                                        onClick={clearOrderItems}
                                        className="group relative w-[200px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mb-2"
                                        >
                                            <div className="absolute inset-0 w-[0px] bg-[red] group-hover:w-full"></div>
                                            <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
                                                <BiTrash />
                                                <span>&nbsp;Clear Order History</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                {(UserOrders?.order_items_count > 0 && !isOrderItemsLoading
                                    ? OrderItems?.data.map((orderItem: any, index: React.Key | null | undefined) => (
                                        <CartItem
                                            key={index}
                                            itemId={orderItem.id}
                                            productId={orderItem.product}
                                            productTitle={orderItem.product_details.name}
                                            productDescription={orderItem.product_details.description}
                                            productImage={orderItem.image}
                                            productPrice={orderItem.product_details.price}
                                            productDiscount={orderItem.product_details.discount_price}
                                            productQuantity={orderItem.quantity}
                                        />
                                        ))
                                    : null )}
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
                            title="You don’t have any orders." 
                            message="Looks like you haven’t ordered anything yet."
                        />
                    )}
                    </main>
                )}
            </CategoryLayout>
        </>
    )
}

export default withAuth(UserOrders);