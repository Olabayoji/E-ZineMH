import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

type Props = {
  text: string;
  loading?: boolean;
  type: "submit" | "button";
  disable?: boolean;
};

const PrimaryButton = (props: Props) => {
  return (
    <button
      className="text-white w-full bg-black rounded-3xl py-3 hover:bg-black/80 duration-500"
      disabled={props.disable}
      type={props.type}
    >
      {props.loading ? <LoadingSpinner /> : props.text}
    </button>
  );
};

export default PrimaryButton;
