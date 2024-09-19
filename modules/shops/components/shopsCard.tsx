import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ShopsCard = ({shops, isLoading, internalView} : {shops: any, isLoading: boolean, internalView: boolean}) => {
    return (
    <div className="bg-white py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-1">
            
          {!isLoading && shops?.data.map((shop: any, index: React.Key) => (
            <li key={index}>
              <div className="group flex flex-col gap-1 rounded-lg p-5">
                <div className="group relative m-0 flex rounded-xl sm:mx-auto sm:max-w-lg">
                  <div className="h-[260px] w-[260px] overflow-hidden rounded-xl">
                    {shop.logo ? (
                        <Image
                        src={`https://res.cloudinary.com/dqvscwcgk/${shop.logo}`}
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
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out  group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110 opacity-0 group-hover:opacity-100">
                    <h1 className="text-[#ffffff] text-lg font-bold">{shop.name}</h1>
                    {!internalView ? (
                      <Link href={`/shops/explore/${shop.id}`}>
                        <h2 className="text-[#ffffff] hover:underline text-m font-light">Explore</h2>
                      </Link>
                    ) : (
                      <Link href={`/shops/manage/${shop.id}`}>
                        <h2 className="text-[#ffffff] hover:underline text-m font-light">Manage</h2>
                      </Link>
                    )}
                  </div>
                  {/* Overlay for hover effect */}
                  <div className="overflow-hidden absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopsCard;