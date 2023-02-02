import React from "react";
import { BiHealth } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

type Props = {};

const Footer = (props: Props) => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bg-black pt-8 md:pt-12
     pb-5 mt-5 md:mt-16 text-white px-4 md:px-8"
    >
      <div className="grid md:grid-cols-2 items-center">
        <div>
          <Link className="flex justify-start items-center gap-x-2" to="/">
            <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
            <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
          </Link>{" "}
          <p className="text-sm text-white/60">Future Moms Matter.</p>
        </div>
        <div className=" grid gap-y-2 mt-6 text-sm md:place-self-end">
          <div className=" flex gap-x-2 items-center text-white/80">
            <BsTelephoneFill />
            <p>+23480118000123</p>
          </div>
          <div className=" flex gap-x-2 items-center text-white/80">
            <MdEmail />
            <a href="mailto:mhmentalH@com.ui.edu.ng">mhmentalH@com.ui.edu.ng</a>
          </div>
        </div>
      </div>
      <hr className="my-6 border-t-[#6868686c] " />
      <div className=" text-white/60 flex justify-between items-center text-xs  md:text-sm">
        <p className="grid md:flex gap-x-1">
          {" "}
          <span className="">©{year} E-zineMH. </span>
          <span> Mental Health. All rights reserved.</span>
        </p>
        <p className="link-underline link-underline-black hover:cursor-pointer">
          PRIVACY POLICY
        </p>
      </div>
    </footer>
  );
};

export default Footer;
