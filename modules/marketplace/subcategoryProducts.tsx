import React from 'react';
import { useQuery } from '@tanstack/react-query';

import ProductCardWrapper from './component/landingpage/productCardWrapper/productCardWrapper';
import { getSubCategoryProducts } from '@/http/marketplace';

function SubCategoryProducts({ categoryId, subcategoryItems }: { categoryId: any, subcategoryItems: any }) {
    return (
        <div>
            {subcategoryItems.data.map((subcategory: any, index: React.Key | null | undefined) => (
                <SubCategoryProductWrapper
                    key={index}
                    categoryId={categoryId}
                    subcategory={subcategory}
                />
            ))}
        </div>
    );
}

function SubCategoryProductWrapper({ categoryId, subcategory }: { categoryId: any, subcategory: any }) {
    const { isLoading: isSubCategoryProductsLoading, data: SubCategoryProducts } = useQuery(
        ['subcategories', categoryId, subcategory.id],
        async () => getSubCategoryProducts(categoryId, subcategory.id)
    );

    return (
        <div key={subcategory.id}>
            <ProductCardWrapper
                title={subcategory.name}
                productsList={{ isLoading: isSubCategoryProductsLoading, items: SubCategoryProducts }}
                showTopPicks={false}
                showAll={true}
                allProducts={false}
                filter={false}
                admin={{status: false, shopId: "", companyId: null}}
            />
        </div>
    );
}

export default SubCategoryProducts;