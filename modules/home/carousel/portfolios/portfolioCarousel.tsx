import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import portraitOne from '../../../../public/assets/images/landing_p/Sample1.jpg';
import portraitTwo from '../../../../public/assets/images/landing_p/Sample2.jpg';
import portraitThree from '../../../../public/assets/images/landing_p/Sample3.jpg';
import portraitFour from '../../../../public/assets/images/landing_p/Sample4.jpg';
import portraitFive from '../../../../public/assets/images/landing_p/Sample5.jpg';
import portraitSix from '../../../../public/assets/images/landing_p/Sample6.jpg';
import portraitSeven from '../../../../public/assets/images/landing_p/Sample7.jpg';
import portraitEight from '../../../../public/assets/images/landing_p/Sample8.jpg';
import portraitNine from '../../../../public/assets/images/landing_p/Sample9.jpg';
import portraitTen from '../../../../public/assets/images/landing_p/Sample10.jpg';

interface Slide {
  src: string;
  alt?: string;
  name?: string;
  role?: string;
  skills?: string[];
  section: 'portrait' | 'portfolio' | 'shop';
  products?: number;
}

const slides: Slide[] = [
  {
    src: portraitOne.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitTwo.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitThree.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitFour.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitFive.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitSix.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitSeven.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitEight.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitNine.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
  {
    src: portraitTen.src,
    alt: 'portfolio',
    section: 'portfolio',
  },
];

const PortfolioCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 5.5,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden p-2 w-full mx-0 mt-[50px]">
      <Slider {...settings}>
        {slides.map((logo, index) => (
          <div key={index} className="relative h-[250px] sm:h-[300px] w-[182.71]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start rounded-[11px] p-3 mr-2 md:mr-6"
                style={{ backgroundImage: `url(${logo?.src})` }}
              >
              </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PortfolioCarousel;