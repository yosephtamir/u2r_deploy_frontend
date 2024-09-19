import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { BiEdit, BiTrash } from 'react-icons/bi';

import ShopLayout from '@/components/Layout/shops-layout';
import SEO from '@/components/SEO';
import { getShopDetailAdmin, getShopProducts } from '@/http/shop';
import ProductCardWrapper from '@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper';
import Paginator from '@/components/ui/paginator';
import { getUserInfo } from '@/http/auth';
import EditShopPopupForm from '@/modules/shops/components/editShopPopup';
import DeleteStore from './components/DeleteStore';

function ShopManage() {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    const Id = localStorage.getItem('userId')
    if (Id !== null) {
      setUserId(Id);
    } else {
    // Handle the case where UserID is not found in localStorage
    // display an error message (not authenticated) or redirect to a login page
    console.error("User ID not found in localStorage");
  }
  }, []);

  useEffect(() => {
    // Fetch user information only if userId is set
    if (userId !== "") {
      getUserInfo(userId);
    }
  }, [userId]);
  const { data: UserInfo } = useQuery(["user-information", userId], async () => getUserInfo(userId));

  const companyId = UserInfo?.data.company.id

  const router = useRouter()
  const { shopId } = router.query;
  console.log(shopId, companyId)
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading: isShopDetailLoading, data: ShopDetail } = useQuery(["shop-detail", shopId, companyId], async () => getShopDetailAdmin(shopId, companyId));
  const { isLoading: isShopProductsLoading, data: ShopProducts } = useQuery(['shop-products', shopId, currentPage], async () => getShopProducts(shopId, currentPage));
 
  const previousLink = ShopProducts?.page_info.previous;
  const nextLink = ShopProducts?.page_info.next;

  const totalPages = Math.ceil(ShopProducts?.page_info.count / 8);
  const paginated = totalPages === 0 ? false : true;

  const [showEditShopPopup, setShowEditShopPopup] = useState(false);
  const toggleEditShopPopup = () => {
      setShowEditShopPopup(!showEditShopPopup);
  };

  const [deleteStoreModalClosed, setDeleteStoreModalClosed] = useState('hidden');
  const deleteShop = () => {
      setDeleteStoreModalClosed('block');
  };
  const closeDeleteStoreModal = () => {
      setDeleteStoreModalClosed('hidden');
  };

  return (
    <ShopLayout>
      <SEO title='Shops - Detail' description='InT Shops - Explore shops and Browse varieties of products.' image="" url="" />
      {showEditShopPopup && 
        <EditShopPopupForm 
          togglePopup={toggleEditShopPopup}
          shopId={shopId}
          shopName={ShopDetail?.data.name}
          shopDescription={ShopDetail?.data.description} 
        />}
      <div className={deleteStoreModalClosed}>
          <DeleteStore closeModal={closeDeleteStoreModal} companyId={companyId} shopId={shopId}/>
      </div>
      {/* <pre>{JSON.stringify(ShopProducts, null, 2)}</pre> */}
      {!isShopDetailLoading && (
        <>
          <div className="bg-cover bg-no-repeat bg-center h-[250px]" style={{ backgroundImage: `url(${`https://res.cloudinary.com/dqvscwcgk/${ShopDetail?.data.cover_image}`})` }}></div>
          <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
            <div className='max-w-[1240px] mx-auto z-50'>
              <div className='flex items-center mb-5 md:mb-8'>
                <h3 className='text-black font-manropeL font-bold md:text-2xl leading-normal'>
                    {ShopDetail?.data.name}
                </h3>
                <BiEdit className='text-[#64D1FF] ml-3 text-[20px] cursor-pointer' onClick={toggleEditShopPopup}/>
                <BiTrash className='text-[red] ml-3 text-[20px] cursor-pointer' onClick={deleteShop}/>
              </div>            
              <h4 className='text-black font-manropeL mb-5 md:mb-8 font-light leading-normal'>
                <span>
                  {ShopDetail?.data.description}
                </span>              
              </h4>
            </div>
            <div className='max-w-[1240px] mx-auto'>
              <ProductCardWrapper
                  title="Our Products"
                  productsList={{ isLoading: isShopProductsLoading, items: ShopProducts }}
                  showTopPicks={false}
                  showAll={false}
                  allProducts={true}
                  filter={false}
                  admin={{status:true, shopId: shopId, companyId: companyId}}
              />
              {paginated && (
                <Paginator 
                  previousLink={previousLink}
                  nextLink={nextLink}
                  setPage={setCurrentPage}
                  page={currentPage}
                  pages={totalPages}
                />
              )}
            </div>
          </div>
        </>
      )}
    </ShopLayout>
  )
}

export default ShopManage;