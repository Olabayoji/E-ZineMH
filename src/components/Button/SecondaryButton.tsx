import React from "react";
import { FcGoogle } from "react-icons/fc";
type Props = {
  text: string;
  onClick: () => void;
};

const SecondaryButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full rounded-3xl border border-slate-400 font-semibold px-2 py-3 hover:bg-slate-200 duration-500"
    >
      <span className="grid grid-cols-[1fr_auto] gap-x-2 items-center content-center w-fit mx-auto">
        <FcGoogle className="w-5 h-5" />
        {props.text}
      </span>
    </button>
  );
};

export default SecondaryButton;
