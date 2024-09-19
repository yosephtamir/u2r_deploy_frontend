import React, { useState } from 'react';
import Image from 'next/image';

import NoResult from '../../../public/assets/images/shops_p/No_result-07.png';

const NoShop = () => {

    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const togglePopup = () => {
        setShowCreatePopup(!showCreatePopup);
    };

    return (
        <>
        <section className="flex flex-col pb-[40px]">
            <div className="pt-[10px] pb-[10px] flex flex-col gap-[32px] items-center justify-center">
            <div className="heading flex flex-col items-center gap-[8px]">
                <Image 
                    src={NoResult}
                    alt='No-Shop-yet'
                    height={350}
                    width={500}
                />
                <h1 className="text-[20px] text-center lg:text-[25px] font-bold leading-[64px] font-manropeL text-[#2E3130]">
                You have no shop yet
                </h1>
                <p className="font-manropeL text-[16px] font-[700] text-center leading-[24px]  text-[#737876]">
                Looks like you haven’t created your shops yet.
                </p>
                <p className="font-manropeL text-[16px] font-[400] text-center text-[#737876] leading-[24px] w-full ">
                    Need some help?{' '} call +251-9-000-00000
            </p>
            </div>
            </div>
        </section>
        </>
    );
    };

    export default NoShop;
