import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import Button from '@/components/ui/Button';
import { ArrowRight } from 'iconsax-react';
import SEO from '@/components/SEO';
import ShopInternalLayout from '@/components/Layout/shops-me-layout';
import { getCompanyShops } from '@/http/shop';
import { getUserInfo } from '@/http/auth';
import ShopsCard from '@/modules/shops/components/shopsCard';
import NoShop from '@/modules/shops/components/NoStore';
import CreateShopPopupForm from '@/modules/shops/components/createShopPopup';
import { withSellerAdminAuth } from '@/helpers/withAdminAuth';

function CompanyShops() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null


  useEffect(() => {
    // Fetch user information only if userId is set
    if (userId !== null) {
      getUserInfo(userId);
    }
  }, [userId]);

  const { data: UserInfo } = useQuery(["user-information", userId], async () => getUserInfo(userId));

  const companyId = UserInfo?.data.company.id
  console.log(userId, companyId)

  const { isLoading: isCompanyAllShopsLoading, data: CompanyAllShops, refetch: refetchCompanyAllShops } = useQuery(["company-all-shops", companyId], async () => getCompanyShops(companyId));
  console.log(CompanyAllShops)

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const togglePopup = () => {
      setShowCreatePopup(!showCreatePopup);
  };

  return (
    <ShopInternalLayout>
        <SEO title='Shops - Company' description='InT Shops - Manage your Shops.' image="" url="" />
        {showCreatePopup && <CreateShopPopupForm togglePopup={togglePopup} />}
        <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
            <div className='flex items-center justify-between max-w-[1240px] mx-auto z-50'>
                <h3 className="text-black font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
                {UserInfo?.data.company.name} - List of Shops.
                </h3>
                <Button
                    href=""
                    className="cursor-pointer rounded-[8px] bg-brand-Light_Sky_Blue-primary 
                    w-full lg:w-[345px] h-[60px] px-[20px] py-[12px] flex gap-[16px] items-center justify-center
                    hover:shadow-xl transition-transform hover:-translate-y-1 duration-300relative 
                    hover:z-10 transform hover:scale-105 duration-300"
                    onClick={togglePopup}
                >
                  <>
                      <p className="text-[#fff] text-[14px] font-[600] leading-[20px] font-manropeL">Create Shop</p>
                      <ArrowRight color="#fff" />
                  </>
                </Button>
            </div>
            {!CompanyAllShops?.page_info.count ? (
              <div>
                <NoShop />
              </div>
            ) : (
              <ShopsCard shops={CompanyAllShops} isLoading={isCompanyAllShopsLoading} internalView={true}/>
            )}
        </div>
    </ShopInternalLayout>
  );
};

// change for different users role (Admin Users && Regular Users)
export default withSellerAdminAuth(CompanyShops);