import PortfolioCarousel from '../../carousel/portfolios/portfolioCarousel';
import Hero from '../../Hero/hero';
import Video from '../../Video';

const SectionOne = () => {
  return (
    <>
    <div className="md:border-b-2 border-[#96969611]">
      <div className="flex justify-center items-center">
        <Hero />
      </div>
      <div>
        <PortfolioCarousel />
      </div>
      <div className='py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto'>
        <Video />
      </div>
    </div>
    </>
  );
};

export default SectionOne;
