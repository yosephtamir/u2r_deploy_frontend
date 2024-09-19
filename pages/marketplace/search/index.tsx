import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';

import Paginator from '@/components/ui/paginator';
import ProductCard from '@/modules/marketplace/component/productCard';
import CategoryLayout from '@/components/Layout/category-layout';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/http/marketplace';
import Empty from '@/components/empty/empty';

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const queryParam = router.query.searchQuery;
  const { refetch: refetchSearchedProducts, data: SearchedProducts } = useQuery(["shop-detail", queryParam, currentPage], async () =>  searchProducts(queryParam, currentPage));
  // Fetch new data when currentPage changes
  useEffect(() => {
      refetchSearchedProducts();
  }, [currentPage, refetchSearchedProducts]);
  const totalPages = Math.ceil(SearchedProducts?.page_info.count / 8);
  const paginated = totalPages === 0 ? false : true;

  return (
    <Fragment>
      <SEO title='Marketplace - Cart' description='U2R marketplace - User Cart.' image="" url="" />
        <CategoryLayout>
          <div className="max-w-[1240px] mx-auto">
            <div id="top" className="px-4 max-w-[1240px] mx-auto">
              <h1 className="text-custom-color31 font-manropeL mt-5 lg:pt-5 md:mb-1 font-bold md:text-2xl leading-normal flex items-center">
                Search Result for <span>{queryParam}</span>
              </h1>
              {SearchedProducts?.page_info.count === 0 ? (
                <Empty
                    title="No Results Found" 
                    message="Make sure all words are spelled correctly or try another words."
                />
              ) : (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-4">
                {SearchedProducts?.data.data.map((item: any) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    currency={item?.currency}
                    image={`https://res.cloudinary.com/dqvscwcgk/${item?.product_thumbnail}`}
                    name={item?.name}
                    price={item?.price}
                    user={item?.shop ? `${item?.shop?.name}` : 'null'}
                    rating={item.rating || 0}
                    showTopPicks={false}
                    discount_price={item?.discount_price}
                    shop={item.shop} 
                    admin={{
                      status: false,
                      shopId: "",
                      companyId: ""
                    }}                  
                  />
                ))}
              </div>
              )}
            </div>
            <Link href="#top" className="mt-10 flex items-center justify-center mb-14 mx-auto w-fit">
              {paginated && (
                <Paginator 
                  previousLink={SearchedProducts?.page_info.previous}
                  nextLink={SearchedProducts?.page_info.next}
                  setPage={setCurrentPage}
                  page={currentPage}
                  pages={totalPages}
                />
              )}
            </Link>
          </div>
        </CategoryLayout>
    </Fragment>
  );
};
