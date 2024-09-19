import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";

import logo from "../../../public/assets/images/logo/INT_logo.png";


function VerificationLayout({children}: any) {
  return (
      <div className=" h-[100dvh]">
          <div className="border-b border-[#EBEEEF] border-style:solid h-[10%]">
              <header className="max-w-[1240px] mx-6 xl:mx-auto h-full flex justify-between items-center ">
                  <Link href={'/'} className="flex items-center gap-2 hover:underline">
                      <Image src={logo} alt="logo" className='w-[30px] h-[30px]' />
                      <span className="font-bold tracking-[0.008rem]">Inclusive Technologies</span>
                  </Link>

                  <Link
                      href={'/'}
                      className="font-manropeL text-sm md:text-base text-[#64D1FF] hover:underline flex items-center gap-2"
                  >
                      <p>Back to MarketPlace</p>
                      <ArrowRight size="24" color="#64D1FF" />
                  </Link>
              </header>
          </div>

          <div className=" h-[90%] px-[24px] w-full relative overflow-hidden flex flex-col items-center justify-center">
              {children}
          </div>
      </div>
  );
};

export default VerificationLayout;
