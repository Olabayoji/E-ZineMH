import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = {
  title: string;
  name: string;
  placeholder?: string;
  type: string;
  error: boolean | undefined;
};

const FormField = (props: Props) => {
  return (
    <div className=" relative mb-6">
      <label
        className="   mb-1 text-xs md:text-sm font-medium "
        htmlFor={props.name}
      >
        {props.title}
      </label>
      <Field
        className={`${
          props.error ? "bg-red-200" : ""
        } "block w-full border h-12  pl-3 rounded focus:outline-none"`}
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      <p className="text-red-700 text-xs mt-1 ">
        <ErrorMessage name={props.name} />
      </p>
    </div>
  );
};

export default FormField;
