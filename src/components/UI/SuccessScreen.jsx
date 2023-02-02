import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiHealth } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

type Props = {
  link?: string,
  message: string,
};

const SuccessScreen = (props: Props) => {
  return (
    <div className="  w-[95%] mx-auto py-6 h-full min-h-screen grid grid-rows-[auto_1fr] ">
      <header className=" mb-8 ">
        <Link className="flex justify-start items-center gap-x-2" to="/">
          <BiHealth className=" w-6 h-6" />
          <h1 className="lg:flex text-xl font-bold">E-zineMH</h1>
        </Link>
      </header>
      <div className="md:max-w-[530px] mx-auto w-full flex flex-col h-full justify-center items-center">
        {/* <img src={email} className=" w-20 md:w-25 mb-3 " alt="email-icon" /> */}
        <SiMinutemailer className="h-16 w-16" />
        <h2 className="text-center mb-1 md:mb-3 font-semibold text-xl md:text-2xl lg:text-3xl">
          Check your inbox
        </h2>
        <p className="text-center max-w-[400px] mb-5 lg:mb-10 mx-auto">
          {props.message}
        </p>
        {/* <a
          className="hover:cursor-pointer text-white w-full text-center bg-black rounded-md py-3 hover:bg-black/80 duration-500"
          href={`https://${props.link}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Email{" "}
        </a> */}

        <Link
          className="flex w-full justify-center items-center gap-x-2 mt-3 md:mt-5 "
          to="/signin"
        >
          <AiOutlineArrowLeft />
          <span className="link-underline link-underline-black hover:font-semibold duration-700">
            Back to log in
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
