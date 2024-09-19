import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryNames } from '@/@types';

const CategoryCard = ({categoryItems, isLoading}: {categoryItems: CategoryNames, isLoading: boolean}) => {
    return (
    <div className="bg-white py-4 sm:py-6">CategoryNames
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-between gap-1">
            
          {!isLoading && categoryItems.data.map((category, index) => (
            <li key={index}>
              <div className="group flex flex-col gap-1 rounded-lg p-5">
                <div className="group relative m-0 flex rounded-xl sm:mx-auto sm:max-w-lg">
                  <div className="h-[260px] w-[260px] overflow-hidden rounded-xl">
                    {category.thumbnails[0]?.url ? (
                        <Image
                        src={category.thumbnails[0]?.url}
                        className="rounded-[8px] object-cover h-full w-full"
                        alt=""
                        width={300}
                        height={300}
                        /> ) : (
                        <Image
                        src="/assets/dummyImage.jpg"
                        className="rounded-[8px] object-cover h-full w-full"
                        alt=""
                        width={300}
                        height={300}
                        />
                    )}
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110 group-hover:opacity-100">
                    <h1 className="text-[#ffffff] text-lg font-bold">{category.name}</h1>
                    <Link href={`/marketplace/category-products/${category.id}`}>
                      <h2 className="text-[#ffffff] hover:underline text-m font-light">View Products</h2>
                    </Link>
                  </div>
                  {/* Overlay for hover effect */}
                  <div className="overflow-hidden absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryCard;
