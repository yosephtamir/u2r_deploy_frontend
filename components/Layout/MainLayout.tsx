import React, { useContext, useEffect } from 'react';

import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import Image from 'next/image';

import MainLayoutContext from '@/context/LayoutContext';
import { MainLayoutProps } from '../../@types';
import Footer from '../footer';
import TopBar from '../Navbar/TopBar';
import CapturePreviousUrl from '../capturePreviousURL';

function MainLayout({
    children,
    activePage,
    className,
    showFooter = true,
    showTopbar,
    includeMarginTop = true,
}: MainLayoutProps) {
    const { setActivePage } = useContext(MainLayoutContext);

    useEffect(() => {
        setActivePage(activePage as string);
    }, [activePage, setActivePage]);

    return (
        <>
            <Head>
                <link rel="icon" href="/assets/INT_logo.png" />
            </Head>
            <CapturePreviousUrl>
                <div className={twMerge('w-full flex flex-col relative h-screen overflow-y-auto overflow-x-hidden', className)}>
                    {showTopbar && <TopBar activePage={activePage} />}

                    <div className={`w-full ${includeMarginTop ? 'mt-5' : ''}`}>{children}</div>

                    {showFooter && <Footer />}
                </div>
            </CapturePreviousUrl>
            
        </>
    );
}

export default MainLayout;