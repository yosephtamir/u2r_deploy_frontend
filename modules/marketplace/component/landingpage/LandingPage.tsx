import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SEO from "@/components/SEO";
import CategoryLayout from "@/components/Layout/category-layout";
import ProductCardWrapper from "./productCardWrapper/productCardWrapper";
import { fetchLimitedOffers, fetchRecommendation, fetchRecentlyViewed } from "@/http/marketplace";

function LandingPage() {

    const { isLoading: isLimitedOfferLoading, data: limitedOffersData } = useQuery(['products/limited_offers'], fetchLimitedOffers)
    const { isLoading: isRecommendationLoading, data: RecommendationData } = useQuery(['recommendations'], fetchRecommendation)
    const { isLoading: isRecentlyViewedLoading, data: RecentlyViewedData } = useQuery(['recently_Viewed'], fetchRecentlyViewed)

    return (
        <CategoryLayout>
            <SEO title='InT Marketplace' description='InT marketplace - Browse varieties of products based on choice.' image="" url="" />
            <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
                <div className="max-w-[1240px] mx-auto">
                    <ProductCardWrapper
                        title="Popular Products"
                        productsList={{ isLoading: isLimitedOfferLoading, items: RecommendationData }}
                        showTopPicks={true}
                        showAll={true}
                        allProducts={false}
                        filter={false}
                        admin={{status: false, shopId: "", companyId: ""}}
                    />
                    <ProductCardWrapper
                        title="Limited Offers"
                        productsList={{ isLoading: isRecommendationLoading, items: limitedOffersData }}
                        showTopPicks={false}
                        showAll={true}
                        allProducts={false}
                        filter={false}
                        admin={{status: false, shopId: "", companyId: ""}}
                    />
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
            </div>
        </CategoryLayout>
    );
};

export default LandingPage;