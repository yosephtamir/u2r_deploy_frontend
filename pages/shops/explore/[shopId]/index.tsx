import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import ShopLayout from '@/components/Layout/shops-layout';
import SEO from '@/components/SEO';
import { getShopDetail, getShopProducts } from '@/http/shop';
import ProductCardWrapper from '@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper';
import Paginator from '@/components/ui/paginator';

function ShopExplore() {
  const router = useRouter()
  const { shopId } = router.query;
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading: isShopDetailLoading, data: ShopDetail } = useQuery(["shop-detail", shopId], async () => getShopDetail(shopId));
  const { isLoading: isShopProductsLoading, data: ShopProducts } = useQuery(['shop-products', shopId, currentPage], async () => getShopProducts(shopId, currentPage));
 
  const previousLink = ShopProducts?.page_info.previous;
  const nextLink = ShopProducts?.page_info.next;

  const totalPages = Math.ceil(ShopProducts?.page_info.count / 8);
  const paginated = totalPages === 0 ? false : true;

  return (
    <ShopLayout>
      <SEO title='Shops - Detail' description='InT Shops - Explore shops and Browse varieties of products.' image="" url="" />
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
                  admin={{status:false, shopId: shopId, companyId: ""}}
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

export default ShopExplore;