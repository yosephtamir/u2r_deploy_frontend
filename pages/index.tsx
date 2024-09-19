import MainLayout from "@/components/Layout/MainLayout";

import SectionOne from "@/modules/home/sections/first/sectionOne";
import SectionTwo from "@/modules/home/sections/second/sectionTwo";
import SEO from "@/components/SEO";

function Home() {
    return (
        <>
            <SEO title='' description='' image='' url='' />
            <MainLayout activePage='home' showTopbar includeMarginTop={false}>
                <SectionOne />
                <SectionTwo />
            </MainLayout>
        </>
    );
}

export default Home;