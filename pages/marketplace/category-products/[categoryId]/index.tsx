import React from 'react';
import { useRouter } from 'next/router';

import SEO from "@/components/SEO";
import CategoryLayout from '@/components/Layout/category-layout';
import CategoryProducts from '@/modules/marketplace/categoryProducts';


function AllCategoryProducts() {
    const router = useRouter();

    return (
        <>
            <SEO title='Marketplace - ' description='U2R marketplace - Browse varieties Categories of products.' image="" url="" />
            <CategoryLayout>
                <CategoryProducts categoryId={router.query.categoryId as string}/>
            </CategoryLayout>
        </>
    )
}

export default AllCategoryProducts;