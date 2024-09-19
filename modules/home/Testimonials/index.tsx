import { Testimonial } from "./SingleTestimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

import image1 from '../../../public/assets/images/landing_p/testimonials/auth-01.png'
import image2 from '../../../public/assets/images/landing_p/testimonials/auth-02.png'
import image3 from '../../../public/assets/images/landing_p/testimonials/auth-03.png'

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Musharof Chy",
    designation: "Founder @TailGrids",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: image1,
    star: 5,
  },
  {
    id: 2,
    name: "Devid Weilium",
    designation: "Founder @UIdeck",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: image2,
    star: 5,
  },
  {
    id: 3,
    name: "Lethium Frenci",
    designation: "Founder @Lineicons",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: image3,
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="dark:bg-white-110 bg-white-500 relative z-10 py-16 md:py-20 lg:py-28">
      <div className="ml-[150px] mr-[150px]">
        <SectionTitle
          title="What Our Users Says"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="flex flex-col-3 gap-10 justify-between items-center">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
