import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { FilterSearch } from "iconsax-react";

import ProductCard from "../../productCard";
import NoProduct from "../../noproduct/noProduct";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import { ArrowRight } from "iconsax-react";
import { ProductCardProps } from "@/@types";
import { setProducts } from "@/features/product/productSlice";
import FilterPopup from "./filterModal";

function ProductCardWrapper({
    productsList,
    title,
    showTopPicks,
    showAll,
    allProducts,
    filter,
    admin
}: {
    productsList: { items: any; isLoading: boolean };
    title: string;
    showTopPicks: boolean;
    showAll: boolean;
    allProducts:boolean;
    filter:boolean;
    admin: { status: boolean; shopId: string | string[] | undefined; companyId: any };
}) {
    const dispatch = useDispatch()

    function handleViewAll(event: any): void {
        dispatch(setProducts({ items: productsList.items, title: title, isLoading: productsList.isLoading }));
    }

    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const toggleFilterPopup = () => {
        setShowFilterPopup(!showFilterPopup);
    };
    console.log(showFilterPopup)

    return (
        <>
        {showFilterPopup && 
            <FilterPopup
                togglePopup={toggleFilterPopup}
            />
        }
        <section className="w-full mb-2.5 md:mb-8 pt-2.5">
            <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
                {title}
                {admin.status &&(
                    <Button
                    href={`http://localhost:3000/shops/me/add-product/${admin.companyId}/${admin.shopId}`}
                    className="cursor-pointer rounded-[8px] bg-brand-Light_Sky_Blue-primary w-full lg:w-[345px] h-[60px] px-[20px] py-[12px] flex gap-[16px] items-center justify-center
                    hover:shadow-xl transition-transform hover:-translate-y-1 duration-300relative hover:z-10 hover:scale-105 duration-300"
                    >
                        <>
                            <p className="text-[#fff] text-[14px] font-[600] leading-[20px] font-manropeL">Add Product</p>
                            <ArrowRight color="#fff" />
                        </>
                    </Button>
                )}
                {showAll && (
                    <Link className="flex items-center gap-2 text-sm font-bold text-[#64D1FF]" onClick={handleViewAll} href='/marketplace/view-all'>
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7.42578 16.5999L12.8591 11.1666C13.5008 10.5249 13.5008 9.4749 12.8591 8.83324L7.42578 3.3999"
                                className=" stroke-[#64D1FF]"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                )}
                {filter && (
                    <Link legacyBehavior href=''>
                        <a 
                            className="flex items-center gap-2 mr-[50px] px-4 py-2 rounded-md text-[#ffffff] tracking-[0.4%] font-manropeL font-semibold text-[16px] bg-brand-Light_Sky_Blue-primary hover:bg-brand-Light_Sky_Blue-hover transition duration-300 ease-in-out shadow-md"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default anchor behavior
                                toggleFilterPopup();
                            }}
                        >
                            <FilterSearch size="32" color="#fff" variant="Bulk" />
                            <span>Filter</span>
                        </a>
                    </Link>
                )}
            </h3>
            {!allProducts && (
                <div>
                {productsList.isLoading ? (
                    <div className="h-[200px] flex items-center justify-center py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
                        <Loader />
                    </div>
                    
                ) : (
                    <>
                        {productsList.items?.page_info.count ? (
                           <div className="flex overflow-scroll gap-3">
                                {productsList.items?.data.slice(0, 8).map((item: ProductCardProps, index: React.Key) => (
                                    <div key={index}>
                                        <ProductCard
                                            id={item?.id}
                                            currency={item?.currency}
                                            image={`https://res.cloudinary.com/dqvscwcgk/${item?.product_thumbnail}`}
                                            name={item?.name}
                                            price={item?.price}
                                            user={item?.shop ? `${item?.shop?.name}` : 'null'}
                                            rating={item?.ave_rating}
                                            showDiscount={title === 'Limited Offers'}
                                            showTopPicks={showTopPicks}
                                            discount_price={item?.discount_price}
                                            shop={item?.shop}
                                            admin={admin}
                                        />
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <>  
                                <NoProduct />
                            </>
                        )}
                    </>
                )}
            </div>
            )}

            {/* show all products with pagination */}
            {allProducts && (
                <div>
                {/* <pre>{JSON.stringify(productsList, null, 2)}</pre> */}
                {productsList.isLoading ? (
                    <div className="h-[200px] flex items-center justify-center py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
                        <Loader />
                    </div>
                    
                ) : (
                    <>
                        {productsList.items?.page_info.count ? (
                           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {productsList.items?.data.map((item: ProductCardProps, index: React.Key) => (
                                    <div key={index}>
                                        <ProductCard
                                            id={item?.id}
                                            currency={item?.currency}
                                            image={`https://res.cloudinary.com/dqvscwcgk/${item?.product_thumbnail}`}
                                            name={item?.name}
                                            price={item?.price}
                                            user={item?.shop ? `${item?.shop?.name}` : 'null'}
                                            rating={item?.ave_rating}
                                            showDiscount={title === 'Limited Offers'}
                                            showTopPicks={showTopPicks}
                                            discount_price={item?.discount_price}
                                            shop={item?.shop}
                                            admin={admin}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>  
                                <NoProduct />
                            </>
                        )}
                    </>
                )}
            </div>
            )}
        </section>
        </>
    )
};

export default ProductCardWrapper;