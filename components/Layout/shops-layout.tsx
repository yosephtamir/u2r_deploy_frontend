import { useQuery } from '@tanstack/react-query';
import MainLayout from './MainLayout';
import CategoriesNav from '@/modules/marketplace/component/categoriesNav/CategoriesNav';
import { getCategoryNames } from '@/http/marketplace';


interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
  isBreadcrumb?: boolean;
  pathName?: string;
}

const ShopLayout = ({ children, ...props }: LayoutProps) => {
    const { isLoading: isCategoryLoading, data: CategoryNames } = useQuery(['categoryNames'], getCategoryNames)
    return (
        <MainLayout activePage="shops" showFooter={true} showTopbar={true} includeMarginTop={false}>
            {/* <CategoriesNav /> */}
            <section {...props}>{children}</section>
        </MainLayout>
    );
};

export default ShopLayout;
