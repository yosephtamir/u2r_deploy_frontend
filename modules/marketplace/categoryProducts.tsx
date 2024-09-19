import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getSubCategories, getSubCategoryProducts } from '@/http/marketplace';
import Loader from '@/components/ui/Loader';
import NoProduct from './component/noproduct/noProduct';
import SubCategoryProducts from './subcategoryProducts';

function CategoryProducts({ categoryId }: any) {
    
    const { isLoading: isSubCategoriesLoading, data: SubCategoryies } = useQuery(
        ['subcategories', categoryId],
        async () => getSubCategories(categoryId)
    );

    return (
        <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
            <div className="max-w-[1240px] mx-auto">
                {isSubCategoriesLoading ? (
                    <div className="h-[200px] flex items-center justify-center py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
                        <Loader />
                    </div>
                ) : (SubCategoryies.data.length > 0 ? (
                        <SubCategoryProducts categoryId={categoryId} subcategoryItems={SubCategoryies}/>
                    ) : (
                        <NoProduct />
                    )
                )}
            </div>
        </div>
    );
}

export default CategoryProducts;
