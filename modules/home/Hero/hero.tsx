import HeroBg from '../../../public/assets/images/landing_p/landingPage.jpg';
import Button from '@/components/ui/Button';

const Hero = () => {
  return (
    <div className="w-full">
      <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${HeroBg.src})` }}>
        <div className="absolute bg-black opacity-50"></div>
        <div className="space-y-2 bg-gradient-to-b from-[#ffffff83] to-white-100 px-2 md:pt-[100px] text-center flex flex-col justify-center items-center">
          <div className="relative pt-[50px] space-y-2">
            <h2 className="text-white text-[36px] md:text-[48px] font-manropeEB leading-[44px]">
              Seamless Commerce, Safe Deliveries
            </h2>
            <h3 className="text-white text-[24px] md:text-[36px] font-manropeB">
              <span className="text-[#64D1FF] underline decoration-1">Inclusive Technologies</span> - Paves the Way!
            </h3>
          </div>
          <div className=" relative text-center text-white text-[16px] font-manropeL">
            <p className="sm:flex sm:flex-col">
              <span>Empower your business to sell anything, anywhere, with secure and reliable deliveries</span>{' '}
              <span>that transcend geographical barriers.</span>
            </p>
          </div>
          <div className="pt-[15px] flex justify-center items-center">
            <Button
              href=""
              className="text-[16px] rounded-[8px] mb-[20px]"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;