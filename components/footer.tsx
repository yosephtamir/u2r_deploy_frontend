import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from '../public/assets/images/logo/INT_logo.png';

function Footer() {
    return (
        <footer className="mt-auto font-manropeL bg-brand-Light_Sky_Blue-primary text-md text-white-100 leading-[1.5]">
            <section className="px-6 py-[4rem] flex flex-col gap-12 md:py-[4rem] md:flex-row md:justify-between xl:max-w-[77.5rem] xl:mx-auto">
                <div className="flex flex-col gap-8 md:w-[20rem] xl:w-[32.5rem]">
                    <div className="flex items-center gap-2 hover:underline">
                        <Link href="/" className="flex items-center gap-2 hover:underline">
                            <Image src={logo} alt="logo" className='w-[30px] h-[30px]' />
                            <span className="font-bold tracking-[0.008rem]">U2R Technologies</span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-[4rem] justify-between md:gap-[4rem] lg:grid-cols-3 xl:gap-16">
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Social Media</h4>

                        <ul className="flex flex-col gap-2 font-normal">
                            <li>
                                <a
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://telegram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://web.facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Services</h4>

                        <ul className="flex flex-col gap-2 font-normal">
                            <li>
                                <Link href="/marketplace" className="hover:underline">
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:underline">
                                    Shop
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Links</h4>

                        <ul className="flex flex-col gap-2 font-normal">
                            <li>
                                <a href="" target="_blank" rel="noreferrer" className="hover:underline">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank" rel="noreferrer" className="hover:underline">
                                    Partner With Us
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank" rel="noreferrer" className="hover:underline">
                                    Merchants
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="w-full p-4 bg-[#285366]  text-center">
                <p>&copy; 2024 U2R Technologies</p>
            </section>
        </footer>
    );
}

export default Footer;