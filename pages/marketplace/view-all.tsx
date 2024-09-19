import React from "react";
import { useSelector } from "react-redux";

import SEO from "@/components/SEO";
import CategoryLayout from "@/components/Layout/category-layout";
import ProductCardWrapper from "@/modules/marketplace/component/landingpage/productCardWrapper/productCardWrapper";

function ViewAll() {
    const title: string = useSelector((state: any) => state.products.title)
    const isLoading: boolean = useSelector((state: any) => state.products.isLoading)
    const items: boolean = useSelector((state: any) => state.products.items)

    return (
        <CategoryLayout>
            <SEO title='InT Marketplace' description='InT marketplace - Browse varieties of products based on choice.' image="" url="" />
            <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
                <div className="max-w-[1240px] mx-auto">
                    <ProductCardWrapper
                        title={title}
                        productsList={{ isLoading: isLoading, items: items }}
                        showTopPicks={title === 'Popular Products' ? true : false}
                        showAll={false}
                        allProducts={true}
                        filter={true}
                        admin={{status: false, shopId: "", companyId: ""}}
                    />
                </div>
            </div>
        </CategoryLayout>
    );
};

export default ViewAll;