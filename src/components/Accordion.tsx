import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import img from "../assets/dr.jpeg";
import dir from "../assets/directors.jpeg";

type Props = {};

const Accordion = (props: Props) => {
  return (
    <div className="w-full px-4 ">
      <div className="mx-auto w-full max-w- rounded-2xl bg-white p-2 grid gap-y-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#F88DA7] px-4 py-2 text-left text-sm font-medium text-white hover:bg-[#f88da8c7] focus:outline-none focus-visible:ring ">
                <span>MESSAGE FROM BOARD</span>
                <HiChevronDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                <section>
                  <img
                    className="w-full max-w-[600px] mx-auto h-48 md:h-56 lg:h-52 object-cover"
                    src={dir}
                    loading="lazy"
                    alt=""
                  />
                  <h2 className="text-center text-black mt-2 text-xl   w-full">
                    Board of Directors
                  </h2>
                  <p className="text-center text-black my-6 font-bold text-2xl md:text-4xl">
                    Our Goal
                  </p>
                  <div className="grid gap-y-4 md:gap-0 md:grid-cols-2 md:gap-x-8 text-justify">
                    <p>
                      Our project recognises the vital roles of family members
                      to effecting behavioural changes in adolescent mothers. to
                      minimize the impact of Climate Change in this population.
                      E-zineMH is a pilot project targeted at young pregnant
                      girls within the age range 16-21 years old. It is a
                      digital health education intervention on climate change.
                      Our digital health education will be accompanied by
                      face-to-face- health education delivered by health care
                      workers within the primary health care system in Ibadan,
                      Nigeria. Our program is led by qualified health
                      professionals with expertise in mental health,
                      environmental health, and climate change. It includes
                      group sessions, interactive activities, and individual
                      counseling to provide a comprehensive and engaging
                      experience.
                    </p>
                    <p>
                      Through this intervention package, adolescents will learn
                      how to identify the physical and psychological effects of
                      climate change, develop resilience strategies to cope with
                      these effects, and take action to make a positive impact
                      on the environment. Our goal is to empower young people
                      with the knowledge and skills they need to protect their
                      mental health and well-being in a rapidly changing world.
                      We hope that this program will serve as a valuable
                      resource for anyone looking to promote mental health and
                      sustainability.
                    </p>
                  </div>
                </section>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#F88DA7] px-4 py-2 text-left text-sm font-medium text-white hover:bg-[#f88da8c7] focus:outline-none focus-visible:ring ">
                <span>MESSAGE FROM FELLOW</span>
                <HiChevronDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                <section>
                  <img
                    className="w-48 md:w-52 rounded-full max-w-[600px]  mx-auto h-48 md:h-52 object-cover"
                    src={img}
                    loading="lazy"
                    alt=""
                  />
                  <p className="text-center text-black leading-snug mt-2 font-bold text-2xl md:text-4xl w-full">
                    Dr. Lola Kola
                  </p>
                  <p className="font-normal text-base text-center text-black mb-6">
                    Senior Research Fellow
                  </p>
                  {/* <h2 className="text-center font-medium md:text-xl  text-black my-4"></h2> */}
                  <div className="grid gap-y-4 md:gap-0 md:grid-cols-2 md:gap-x-8 text-justify">
                    <p>
                      We are excited to share with you our latest health
                      education intervention package aimed at addressing the
                      impact of climate change on adolescents with perinatal
                      depression. Climate change is a global crisis that affects
                      all aspects of life, including our physical, emotional and
                      mental well-being. Adolescents with perinatal depression
                      are a particularly vulnerable group and are at an
                      increased risk for further exacerbation of their symptoms
                      as a result of climate change.
                    </p>{" "}
                    <p>
                      We believe that the Health Education Intervention Package
                      is an important step towards addressing the impact of
                      climate change on mental health, and we're proud to be at
                      the forefront of this initiative. Whether you're an
                      adolescent with perinatal depression or simply someone
                      looking to promote mental health and sustainability, we
                      invite you to join us in this exciting and impactful
                      journey.
                    </p>
                  </div>
                </section>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
