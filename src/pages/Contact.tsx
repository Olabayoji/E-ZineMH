import React, { useEffect, useRef, useState } from "react";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import bgImg from "../assets/maps.jpeg";
import PrimaryButton from "../components/Button/PrimaryButton";
import FormField from "../components/FormField";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AiTwotonePhone } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import Toast from "../components/UI/Toast";
import { Link } from "react-router-dom";
type Props = {};

const Contact = (props: Props) => {
  const [showError, setShowError] = useState<any>(null);
  const [success, setSuccess] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const imageStyle = {
    backgroundImage: ` url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    //   backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "50vh",
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initial values
  const initialValues = {
    name: "",
    telephone: "",
    email: localStorage.getItem("email") ? localStorage.getItem("email")! : "",
    message: "",
    subject: "",
  };

  //
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    subject: Yup.string().required("Required"),
    telephone: Yup.string().required("Required"),
    message: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
  });

  //
  const form = useRef<any>();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  // };

  const onSubmit = async (values: any, { resetForm }: any) => {
    setShowError(null);
    setLoading(true);
    await emailjs
      .sendForm(
        "service_c2hla0l",
        "template_xqy99ps",
        "#contact-form",
        "4__gkcvG88vMxcW8N"
      )
      .then(
        (result) => {
          setSuccess(true);
          resetForm();
        },
        (error) => {
          setShowError(error.text);
        }
      );
    setLoading(false);
  };
  return (
    <div className="h-full mt-[64px] min-h-[90vh] ">
      <div
        style={imageStyle}
        className="relative grid h-full  w-full place-content-center   bg-my-gray  "
      >
        <div className="layer"></div>

        <div className="grid items-center justify-center z-50 text-white/90 px-4">
          <p className="text-2xl md:text-4xl font-light mb-2 text-center ">
            We'd love to hear from you
          </p>
          <p className="italic text-center text-sm md:text-sm">
            Drop us a line, or give us heads up if you're interested in visiting
            us.
          </p>
        </div>
      </div>
      <div className="bg-slate-100 rounded-full w-fit mx-auto px-1 py-1 relative top-[-18px]">
        <MdKeyboardArrowDown className="h-8 w-8" />
      </div>
      {/*  */}
      <div className="grid grid-cols-2 md:grid-cols-3 my-4 md:my-8 gap-y-4 md:gap-y-0 md:gap-x-4 text-xs md:text-sm">
        <div>
          <div className="text-center max-w-sm mx-auto">
            <MdLocationOn className="rounded-full  mx-auto text-white bg-black px-2 py-2  h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16" />
            <h3 className="uppercase font-medium text-base md:text-xl my-2">
              Address
            </h3>
            <a
              href="https://www.google.com/maps/place/College+Of+Medicine,+University+Of+Ibadan/@7.4014977,3.8981533,17z/data=!4m5!3m4!1s0x10398d5dc59a90db:0xdef69a239d1f3685!8m2!3d7.4014924!4d3.900342"
              target={`_blank`}
            >
              <address className="text-black/80 not-italic">
                <span className="font">WHO Collaborating Centre,</span> <br />{" "}
                Department of Psychiatry, <br /> College of Medicine, <br />{" "}
                University of Ibadan, <br /> Nigeria.
              </address>
            </a>
          </div>
        </div>
        <div>
          <div className="text-center max-w-sm mx-auto">
            <AiTwotonePhone className="rounded-full  mx-auto text-white bg-black px-2 py-2  h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16" />
            <h3 className="uppercase font-medium text-base md:text-xl my-2">
              phone
            </h3>
            <ul className="gap-1 grid">
              <li>+23480118000123</li>
              <li>+23480118000123</li>
              <li>+23480118000123</li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="text-center max-w-sm mx-auto">
            <MdEmail className="rounded-full  mx-auto text-white bg-black px-2 py-2  h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16" />
            <h3 className="uppercase font-medium text-base md:text-xl my-2">
              email
            </h3>
            <ul className="gap-1 grid">
              <li>
                <a href="mailto:ezinemh@gmail.com">ezinemh@gmail.com</a>
              </li>
              <li>
                <a href="mailto:mhmentalH@com.ui.edu.ng">
                  mhmentalH@com.ui.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Get in touch */}
      <section className="grid justify-center bg-white items-center mt-8 md:mt-20">
        <h2 className=" font-medium text-xl md:text-3xl mb-4 md:mb-6 lg:mb-8 text-center">
          Get in touch
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
          innerRef={form}
        >
          {({ errors, touched, values }) => (
            <Form id="contact-form" className=" flex flex-col justify-between">
              <div>
                <div
                  className={`${
                    values.email !== ""
                      ? "md:grid-cols-2 lg:grid-cols-2 grid-cols-1 "
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
                  } grid  gap-x-4`}
                >
                  <FormField
                    name="name"
                    title="Full Name*"
                    type="text"
                    error={!!(errors.name && touched.name)}
                  />

                  <div className={`${values.email !== "" && "hidden"}`}>
                    <FormField
                      name="email"
                      title="Email*"
                      type="email"
                      error={!!(errors.email && touched.email)}
                    />
                  </div>

                  <FormField
                    name="telephone"
                    title="Telephone*"
                    type="tel"
                    error={!!(errors.telephone && touched.telephone)}
                  />
                </div>
                <FormField
                  name="subject"
                  title="Subject*"
                  type="text"
                  error={!!(errors.subject && touched.subject)}
                />
              </div>
              <div className=" relative mb-6">
                <label
                  className="   mb-1 sm:text-xs font-medium "
                  htmlFor={"message"}
                >
                  Message*
                </label>
                <Field
                  className={`${
                    !!(errors.message && touched.message) ? "bg-red-200" : ""
                  } block w-full border h-12  pl-3 rounded focus:outline-none min-h-[40px] md:min-h-[80px]`}
                  name={"message"}
                  id={"message"}
                  as="textarea"
                />
                <p className="text-red-700 text-xs mt-1 ">
                  <ErrorMessage name={"message"} />
                </p>
              </div>

              <PrimaryButton
                text="Send →"
                loading={loading}
                disable={loading}
                type="submit"
              />
            </Form>
          )}
        </Formik>
        {(showError || success) && (
          <Toast
            success={success}
            close={() => {
              setShowError(null);
              setSuccess(false);
            }}
            message={showError ? showError : "Email sent"}
          />
        )}
      </section>
    </div>
  );
};

export default Contact;
