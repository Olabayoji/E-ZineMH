import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

type Props = {
  message: string;
  close: () => void;
  success?: boolean;
};

const Toast = (props: Props) => {
  return (
    <div
      id="toast-warning"
      className={` ${
        props.success ? "bg-green-600 " : "bg-red-600 "
      } fixed bottom-2 right-8 max-w-[96%] md:max-w-[48%] lg:max-w-[35%] flex items-center w-full p-4 text-white rounded-lg shadow 
      `}
      role="alert"
    >
      <div
        className={`   ${
          props.success ? "bg-lime-500 " : "text-orange-500"
        } inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg `}
      >
        {!props.success ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <AiFillCheckCircle className="text-white" />
        )}
      </div>
      <div className=" flex items-center w-full">
        <div className="ml-3 text-sm font-normal">{props.message}</div>
        <button
          onClick={props.close}
          type="button"
          className="ml-auto relative top-2 text-gray-400 hover:text-gray-900 rounded-lg  inline-flex h-8 w-8 "
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-5 h-5"
            fill="#fff"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
