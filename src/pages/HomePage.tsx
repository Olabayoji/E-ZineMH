import { Disclosure } from "@headlessui/react";
import { useEffect } from "react";
import img from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import Accordion from "../components/Accordion";
import Carousel from "../components/Carousel/Carousel";

type Props = {};

const HomePage = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-[64px]">
      <Carousel />
      <div className="flex justify-center px-4 md:px-8 text-center my-6 max-w-[1000px]  mx-auto md:my-12 lg:my-16 font-semibold text-2xl md:text-3xl lg:text-4xl">
        Health Education intervention package to address the Impact of Climate
        Change in Adolescents with Perinatal Depression
      </div>
      {/* About */}
      <div className="px-4 md:px-8">
        <hr className="" />
        <div className="flex flex-col-reverse  md:grid grid-cols-[1.25fr_1.75fr] my-4 w-full max-w-[2560px] gap-x-6 ">
          {/* Image section */}
          <div className="mt-6 md:mt-0 grid grid-cols-2 gap-4 place-content-center justify-center">
            <img
              className="w-full h-48  lg:h-52 object-cover"
              src={img}
              loading="lazy"
              alt=""
            />
            <img
              className="w-full h-48  lg:h-52  object-cover"
              loading="lazy"
              src={img2}
              alt=""
            />
            <img
              className="w-full h-48 lg:h-60   object-cover col-span-2"
              loading="lazy"
              src={img3}
              alt=""
            />
          </div>
          {/* Text section */}
          <section className="block md:grid gap-x-6 md:gap-x-8 text-justify grid-cols-2 ">
            <h2 className="col-span-2 mb-4 font-bold text-lg md:text-xl text-center">
              ABOUT
            </h2>
            <p>
              Welcome to our Health Education Intervention Package aimed at
              addressing the impact of climate change on adolescents who have
              experienced perinatal depression. Climate change is one of the
              most pressing issues of our time, and it has the potential to
              significantly impact the mental health of individuals, especially
              those who are already vulnerable. High temperatures in tropical
              regions could increase mental and physical health complications of
              perinatal adolescents and their infants. This increases their
              risks of depression and pregnancy related complications such as
              miscarriages, preterm birth, low infant birth weight and still
              births. The United Nations recommends health education as a key
              strategy to addressing the impact of climate change.
            </p>
            <p>
              To help address this important issue, we've developed this
              comprehensive educational program specifically for adolescents
              aged 16 to 21 who have experienced perinatal depression. The
              program is led by a team of highly qualified health professionals
              who specialize in mental health, environmental health, and climate
              change. Through this program, adolescents will develop the skills
              and knowledge they need to better understand and cope with the
              effects of climate change on their mental health. They will also
              learn about the environmental and health impacts of climate
              change, and how they can make a positive impact on the world
              around them.
            </p>
          </section>
        </div>
      </div>
      {/* Accordions */}
      <div>
        <hr className="px-4 my-6 md:my-8" />
        <Accordion />
      </div>
    </div>
  );
};

export default HomePage;
