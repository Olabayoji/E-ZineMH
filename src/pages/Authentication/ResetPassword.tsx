import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { BiHealth } from "react-icons/bi";
import FormField from "../../components/FormField";
import SuccessScreen from "../../components/UI/SuccessScreen";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firbase";

type Props = {};

const ResetPassword = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  // Initial form data
  const initialValues = {
    email: "",
  };

  const validation = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  // onSubmit
  const onSubmit = async (values: { email: string }) => {
    console.log("submitted");
    setLoading(true);
    try {
      const result = await sendPasswordResetEmail(auth, values.email);
      setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  if (passwordReset) {
    return (
      <div className="flex items-center justify-center text-center  w-screen h-screen  bg-[white]">
        <h1 className="text-lg">
          Password reset successful. You can now log into your account
        </h1>
      </div>
    );
  }

  return !success ? (
    <div className="grid grid-rows-[auto_1fr] max-w-[95%] w-full mx-auto h-full min-h-screen items-center ">
      <header className=" py-6">
        <Link className="flex justify-start items-center gap-x-2" to="/">
          <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
          <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
        </Link>{" "}
      </header>
      <div className="  md:max-w-[530px] mx-auto w-full">
        <h2 className="text-center md:mb-3 font-semibold text-xl md:text-2xl lg:text-3xl">
          Set a new password
        </h2>
        <p className="text-center md:max-w-[400px] mx-auto text-black/60">
          Enter your registered email below to receive password reset.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className=" mt-10 lg:mt-14 mb-6 flex flex-col justify-between ">
              <FormField
                name="email"
                title="Email*"
                type="email"
                error={!!(errors.email && touched.email)}
              />
              <PrimaryButton
                text="Reset Password"
                disable={false}
                loading={loading}
                type="submit"
              />

              <Link
                className="flex justify-center items-center gap-x-2 mt-3 md:mt-7 "
                to="/signin"
              >
                <AiOutlineArrowLeft />
                <span className="link-underline link-underline-black hover:font-semibold duration-700">
                  Back to Login
                </span>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ) : (
    <SuccessScreen message="Please Click on the reset Link sent to your email." />
  );
};

export default ResetPassword;
