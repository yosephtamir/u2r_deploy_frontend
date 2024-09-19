import React from 'react';
import { useQuery } from '@tanstack/react-query';

import ShopsCard from './components/shopsCard';
import ShopLayout from '@/components/Layout/shops-layout';
import { getAllShops } from "../../http/shop"


function ShopLanding() {
  const { isLoading: isShopsLoading, data: allShops } = useQuery(["all-shops"], getAllShops);

  return (
    <ShopLayout>
        <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
            <div className='max-w-[1240px] mx-auto z-50'>
                <h3 className="text-black font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
                Discover Shops of different Companies.
                </h3>
            </div>
            <ShopsCard shops={allShops} isLoading={isShopsLoading} internalView={false}/>
        </div>
    </ShopLayout>
  )
}

export default ShopLanding;