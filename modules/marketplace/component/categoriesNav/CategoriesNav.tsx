import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import more from "../../../../public/assets/ic_outline-arrow-back-ios.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faHeadset, faGem, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CategoriesNav = () => {
    return (
        <div className={`font-ppReg shadow-sm -mt-4 px-4 py-5 relative`}>
            <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-center justify-center bg-white rounded-lg p-4 md:w-[300px]">
                    <div className="w-8 h-8 flex items-center justify-center bg-transparent"><FontAwesomeIcon icon={faTags} className="text-[#64D1FF]"/></div>
                    <h3 className="text-light text-lg ml-4">Get Up to 30% off New Arrivals</h3>
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg p-4 md:w-[300px]">
                    <div className="w-8 h-8 flex items-center justify-center bg-transparent"><FontAwesomeIcon icon={faHeadset} className="text-[#64D1FF]"/></div>
                    <h3 className="text-light text-lg ml-4">24/7 Customer Support</h3>
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg p-4 md:w-[300px]">
                    <div className="w-8 h-8 flex items-center justify-center bg-transparent"><FontAwesomeIcon icon={faGem} className="text-[#64D1FF]"/></div>
                    <h3 className="text-light text-lg ml-4">Best Quality Products</h3>
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg p-4 md:w-[300px]">
                    <Link href="/marketplace/allcategories/" className="text-[#64D1FF] text-lg hover:underline">Explore All Categories</Link>
                    <Image src={more} alt={""} className="ml-4" />
                </div>
            </div>
        </div>
    );
};

export default CategoriesNav;
