import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '../Common/SectionTitle';

interface featureProps {
  data: Array<any>;
}

const Features = ({ data }: featureProps) => {
  return (
    <>
    <section id="features" className="py-5 md:py-10 lg:py-12">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center pb-10 w-full md:space-x-4 space-y-4">
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex flex-col space-y-4 w-full md:w-[40%] lg:w-[298px] min-h-[340px] justify-center items-center p-3 bg-brand-Light_Sky_Blue-shade95 m-2 ${
                  index === 0 ? 'mt-6' : ''
                }`}
              >
                <Image src={item.img} alt={item.name} width={48} height={48} />
                <h3 className="text-[#3F3F50] text-center font-manropeEB text-[20px]">{item.name}</h3>
                <p className="text-[#656673] text-center font-manropeL text-[16px]">{item.desc}</p>
                <Link
                  href={item.href}
                  className="text-[#64D1FF] underline decoration-1 font-manropeEB text-[16px] flex justify-center items-center"
                >
                  {item.slug} <ArrowRight2 color="#64D1FF" size={22} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
    
  );
};

export default Features;
