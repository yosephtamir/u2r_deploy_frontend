import Features from '../../../../modules/home/features/features';
import FeatureOne from '../../../../public/assets/images/landing_p/icon-1.png';
import FeatureTwo from '../../../../public/assets/images/landing_p/icon-2.png';
import HeroBg from '../../../../public/assets/images/landing_p/landingPage1.png';
import Brands from '../../Brands';
import Testimonials from '../../Testimonials';
import About from '../../About/About';

const data = [
  {
    name: 'Access to Niche Markets',
    img: FeatureOne.src,
    href: '/marketplace',
    slug: 'Browse Products',
    desc: 'Explore a diverse array of products curated by skilled businesses. captivating business offerings!',
  },
  {
    name: 'Digital Storefronts',
    img: FeatureTwo.src,
    href: '/shop',
    slug: 'Create Shop',
    desc: "Establish your digital storefront effortlessly. For your unique products, create your space seamlessly!",
  },
  {
    name: 'Seamless Payment Integration',
    img: FeatureOne.src,
    href: '/payments',
    slug: 'Secure Payments',
    desc: 'Implement secure and reliable payment solutions to enhance your customer experience and increase trust.',
  },
  {
    name: 'Advanced Analytics',
    img: FeatureTwo.src,
    href: '/analytics',
    slug: 'Track Performance',
    desc: 'Leverage advanced analytics to track your business performance, understand customer behavior, and optimize your strategies.',
  },
];

const SectionTwo = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-cover bg-no-repeat bg-center h-[400px]" style={{ backgroundImage: `url(${HeroBg.src})` }}></div>
      <div className="flex justify-center items-center py-2 w-full">
        <Features data={data} />
      </div>
      <div className="">
        <Brands />
      </div>
      <About />
      <div className="">
        <Testimonials />
      </div>
    </div>
  );
};

export default SectionTwo;
