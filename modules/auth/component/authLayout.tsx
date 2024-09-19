import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from '../../../public/assets/images/logo/INT_logo.png';
import leftImage from '../../../public/assets/images/Authentication_p/AUTH1.png';

interface AuthLayoutProps {
    children: React.ReactNode;
    authLeftImage?: React.ReactNode;
}

function AuthLayout({ children, authLeftImage }: AuthLayoutProps) {
    return (
        <div className="relative  h-[100dvh]">
            {/* Header for screens less than 1024px */}
            <div className=" py-6 pl-6 md:pl-10 md:px-10 border-b border-b-white-115 lg:hidden bg-white-100">
                <Link href="/" className="flex items-center gap-2 hover:underline">
                    <Image src={logo} alt="Logo" className='w-[30px] h-[30px]' />
                    <span className="font-bold tracking-[0.008rem]">U2R Technologies</span>
                </Link>
            </div>

            <div className=" px-6  lg:px-16 2xl:w-[1440px] xl:mx-auto">
                <div className=" h-screen grid grid-cols-1 lg:gap-10 xl:gap-20 text-sm lg:flex">
                    <div className=" py-12 hidden lg:block lg:w-3/5">
                        <div className="h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden ">
                            {authLeftImage ?? (
                                <Image
                                    // width={100}
                                    // height={100}
                                    src={leftImage}
                                    priority={true}
                                    alt="Sign up image"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div className=" flex flex-col gap-[60px] lg:w-2/5">
                        {/* Header for screens larger than 1024px */}
                        <Link href="/" className="hidden pt-10 lg:block">
                            <div className="flex items-center gap-2">
                                <Image src={logo} alt="Logo" className='w-[30px] h-[30px]' />
                                <span className="font-bold tracking-[0.008rem] text-xl">U2R Technologies</span>
                            </div>
                        </Link>
                        {/* give the element on the right of the container a max width of 672px, only on screen size less than 1024px */}
                        {/* <div className="max-lg:max-w-2xl mx-auto lg:mx-0 w-full lg:pb-4">{children}</div> */}
                        <div className=" mx-auto lg:mx-0 w-full mt-8 md:mt-[120px] md:px-28 lg:px-0 lg:mt-0 lg:pb-4 lg:overflow-y-scroll no-scroll">
                            {children}
                        </div>
                        <style jsx>{`
              .no-scroll::-webkit-scrollbar {
                display: none;
              }

              .no-scroll {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;