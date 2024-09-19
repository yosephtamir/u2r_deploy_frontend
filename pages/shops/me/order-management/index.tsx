import React from 'react';
import SEO from '@/components/SEO';
import ShopInternalLayout from '@/components/Layout/shops-me-layout';
import { withSellerAdminAuth } from '@/helpers/withAdminAuth';

function OrderManagement() {
  return (
    <ShopInternalLayout>
        <SEO title='Shops - Dashboard' description='InT Shops - Dashboard.' image="" url="" />
        <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
          <div className='max-w-[1240px] mx-auto z-50'>
            StoreOwner Order Management
          </div>
        </div>
    </ShopInternalLayout>
  );
}

// change if there are different users role
export default withSellerAdminAuth(OrderManagement);