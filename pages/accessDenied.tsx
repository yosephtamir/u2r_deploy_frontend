'use client';
import Image from 'next/image';

import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import oops from '../public/assets/images/Authentication_p/error-05.png';
import PlainHeader from '@/modules/auth/component/plainHeader/PlainHeader';
import Container from '@/modules/auth/component/container/Container';


const title = `Access Denied 🚫`;
const text = `Hold up! It seems you've reached a restricted area. We're here to make sure everything stays safe and private. To enter this zone, you might need special credentials or permissions.`;
const btnText = `Take me to the homepage`;
function Error403() {
  return (
    <>
      {' '}
      <SEO title='404 -' description='' image='' url='' />
      <main className=" bg-white-100 min-h-screen">
        <PlainHeader />
        <div className=" border-b border-white-115 border-style: solid" />
        <Container>
          <section
            className=" flex flex-col gap-9 sm:gap-[72px] min-h-[calc(100vh-105px)]sm:mx-[105] items-center justify-center xl:flex-row-reverse xl:gap-[162px]"
          >
            <Image
              src={oops}
              alt="oops"
              className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] xl:w-[480px] xl:h-[480px]"
            />
            <div className=" flex flex-col justify-center items-center xl:items-start gap-6">
              <h2 className=" text-2xl md:text-[32px] xl:text-[45px] md:leading-[36px] xl:leading-[52px] sm:font-bold xl:text-left max-w-[504px] text-center font-semibold font-manropeL xl:font-manropeB">
                {title}
              </h2>
              <p className="text-white-650 max-w-[623px]  text-sm sm:text-2xl sm:left-8 sm:text-gray-300 text-center xl:text-left ">
                {text}
              </p>
              <Button className=" w-full h-[52px] xl:w-[517px] rounded-lg text-base mt-3" href="/">
                {btnText}
              </Button>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default Error403;
