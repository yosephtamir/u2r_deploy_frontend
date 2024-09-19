import MainLayout from './MainLayout';
import DashboardNav from '@/modules/shops/components/dashboardNav';


interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
  isBreadcrumb?: boolean;
  pathName?: string;
}

const ShopInternalLayout = ({ children, ...props }: LayoutProps) => {
    return (
        <MainLayout activePage="shops" showFooter={true} showTopbar={true}>
        <DashboardNav />
        <section {...props}>{children}</section>
        </MainLayout>
    );
};

export default ShopInternalLayout;
