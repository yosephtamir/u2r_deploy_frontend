import Link from "next/link";
import { useRouter } from "next/router";

const DashboardNav = () => {

    // Active page
    const router = useRouter();
    const activeLink = (path: string) =>
        router.pathname === path
        ? 'bg-brand-Light_Sky_Blue-primary text-[#ffffff] rounded-md px-3 py-2 text-sm font-medium'
        : 'text-gray-300 hover:bg-[#bdebff] hover:text-white rounded-md px-3 py-2 text-sm font-medium';

    return (
        <div className={`font-ppReg shadow-sm -mt-4 px-4 py-5 relative`}>
            <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex gap-10 items-start">
                    <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me')} href={'/shops/me'}>
                        Company Shops
                        </Link>
                        {router.pathname === '/shops/me'}
                    </div>
                    <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me/dashboard')} href={'/shops/me/dashboard'}>
                        Dashboard
                        </Link>
                        {router.pathname === '/shops/me/dashboard'}
                    </div>
                    {/* <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me/company-shop-products')} href={'/shops/me/company-shop-products'}>
                        Products
                        </Link>
                        {router.pathname === '/shops/me/company-shop-products'}
                    </div> */}
                    <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me/order-management')} href={'/shops/me/order-management'}>
                        Order Management
                        </Link>
                        {router.pathname === '/shops/me/order-management'}
                    </div>
                    <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me/promotions')} href={'/shops/me/promotions'}>
                        Promotions
                        </Link>
                        {router.pathname === '/shops/me/promotions'}
                    </div>
                    <div className=" group flex flex-col ali justify-center items-center gap-1 ">
                        <Link className={activeLink('/shops/me/reviews')} href={'/shops/me/reviews'}>
                        Reviews
                        </Link>
                        {router.pathname === '/shops/me/reviews'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;