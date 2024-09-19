import React from 'react';

import SEO from '@/components/SEO';
import ShopInternalLayout from '@/components/Layout/shops-me-layout';
import { withSellerAdminAuth } from '@/helpers/withAdminAuth';
import CardOne from './component/card1';
import CardTwo from './component/card2';
import CardThree from './component/card3';
import CardFour from './component/card4';
import ChartOne from './component/ChartOne';

function Dashboard() {
  return (
    <ShopInternalLayout>
        <SEO title='Shops - Dashboard' description='InT Shops - Dashboard.' image="" url="" />
        <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
          <div className='max-w-[1240px] mx-auto z-50'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardOne />
              <CardTwo />
              <CardThree />
              <CardFour />
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
              <ChartOne />
              {/* <ChartTwo />
              <ChartThree />
              <MapOne />
              <div className="col-span-12 xl:col-span-8">
                <TableOne />
              </div>
              <ChatCard /> */}
            </div>
          </div>
        </div>
    </ShopInternalLayout>
  );
}

// change if there are different users role
export default withSellerAdminAuth(Dashboard);