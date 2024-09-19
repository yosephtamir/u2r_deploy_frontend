import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';

import SEO from "@/components/SEO";
import CategoryLayout from '@/components/Layout/category-layout';
import Loader from '@/components/ui/Loader';
import { fetchRecentlyViewed, getWishListItems, getUserWishList } from '@/http/marketplace';
import withAuth from '@/helpers/withAuth';
import WishListItem from './components/wishlist-item-card';
import ProductCardWrapper from '@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper';
import Button from '@/components/ui/Button';
import { BiTrash } from 'react-icons/bi';
import ClearYourWishList from './components/ClearWishList';
import Empty from '@/components/empty/empty';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialWishList } from '@/features/wishlist/wishlistSlice'

function UserWishList() {
    const dispatch = useDispatch()
    const [modalClosed, setModalClosed] = useState('hidden');

    const wishListItemsCount = useSelector((state: any) => state.wishlist.count)

    const {isLoading: isUserWishListLoading, data: UserWishList } = useQuery(["user-WishList"], getUserWishList);
    const {isLoading: isWishListItemsLoading, data: WishListItems } = useQuery(["WishList-items"], getWishListItems);
    const { isLoading: isRecentlyViewedLoading, data: RecentlyViewedData } = useQuery(['recently_Viewed'], fetchRecentlyViewed)

    useEffect (() => {
        if (WishListItems?.data) {
            const initialWishListItems = WishListItems?.data.map((wishListItem: any) => ({
                id: wishListItem.id,
                name: wishListItem.product_details.name,
                price: wishListItem.product_details.price
            }));

        dispatch(setInitialWishList(initialWishListItems))
        }
    })
    

    const clearWishListItems = () => {
        setModalClosed('block');
    };

    const closeModal = () => {
        setModalClosed('hidden');
    };

    return (
        <>
            <SEO title='Marketplace - WishList' description='U2R marketplace - User WishList.' image="" url="" />
            <div className={modalClosed}>
                <ClearYourWishList closeModal={closeModal}/>
            </div>
            <CategoryLayout>
                {isUserWishListLoading?(
                <div className="h-[550px]">
                    <Loader/>
                </div>
                ) : (
                    <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
                    {UserWishList?.items_count? (
                        <>
                        <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
                            <div className="w-full flex flex-col justify-center md:w-full lg:justify-normal lg:w-4/5 ">
                                <div className="flex justify-between items-center mb-5">
                                    <h1 className="text-2xl font-manropeEB">My Wishlist ({wishListItemsCount}) </h1>
                                    <div>
                                        <Button
                                        onClick={clearWishListItems}
                                        className="group relative w-[150px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB mb-2"
                                        >
                                            <div className="absolute inset-0 w-[0px] bg-[red] group-hover:w-full"></div>
                                            <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
                                                <BiTrash />
                                                <span>&nbsp;Clear Wishlist</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                {(UserWishList?.items_count > 0 && !isWishListItemsLoading
                                    ? WishListItems?.data.map((wish_listItem: any, index: React.Key | null | undefined) => (
                                        <WishListItem
                                            key={index}
                                            itemId={wish_listItem.id}
                                            productId={wish_listItem.product}
                                            productTitle={wish_listItem.product_details.name}
                                            productDescription={wish_listItem.product_details.description}
                                            productImage={wish_listItem.image}
                                            productPrice={wish_listItem.product_details.price}
                                            productDiscount={wish_listItem.product_details.discount_price}
                                            productStatus={wish_listItem.product_details.stock_status}
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
                            title="Your WishList is Empty" 
                            message="Looks like you haven’t added anything to Your WishList yet."
                        />
                    )}
                    </main>
                )}
            </CategoryLayout>
        </>
    )
}

export default withAuth(UserWishList);