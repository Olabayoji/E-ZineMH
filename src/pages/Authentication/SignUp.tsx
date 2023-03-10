import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHealth } from "react-icons/bi";
import SecondaryButton from "../../components/Button/SecondaryButton";
import PrimaryButton from "../../components/Button/PrimaryButton";
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import bgImg from "../../assets/bg2.jpeg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../utils/firbase";
import Toast from "../../components/UI/Toast";
import SuccessScreen from "../../components/UI/SuccessScreen";
import { createUser, signIn } from "../../lib/api";
const SignUp = () => {
  // Error

  const [showError, setShowError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [href, setHref] = useState("");
  let navigate = useNavigate();
  const closeErrorHandler = () => {
    setShowError(null);
  };

  // Initial values
  const initialValues = {
    first_name: "",
    last_name: "",
    category: "",
    email: "",
    password: "",
  };

  // Sign up with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    const date = new Date();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        await createUser({
          first_name: result.user.displayName!.split(" ")[0],
          last_name: result.user.displayName!.split(" ")[1],
          email: result.user.email!,
          category: "",
          date: date.toISOString(),
        });
      }
      if (result.user.emailVerified) {
        await signIn({
          email: result.user.email!,
          time_stamp: date.toISOString(),
        });
        sessionStorage.setItem("email", result.user.email!);
        // result.user.emailVerified && setAuthenticated(true);
        result.user.emailVerified && navigate("/");
      }
    } catch (error) {}
  };

  const onSubmit = async (values: {
    first_name: string;
    last_name: string;
    category: string;
    email: string;
    password: string;
  }) => {
    setShowError(null);
    setLoading(true);
    const email = values.email;
    const date = new Date();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredentials && userCredentials.user) {
        sendEmailVerification(userCredentials.user);
        await createUser({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          category: values.category,
          date: date.toISOString(),
        });
        setLoading(false);
        setSuccess(true);
      }
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setShowError("Email already registered");
          break;
        case "auth/weak-password":
          setShowError(
            "Weak Password. Password should be at least 6 characters"
          );
          break;

        default:
          setShowError(err.message);
      }
      setLoading(false);
    }

    sessionStorage.setItem("email", email);
  };

  return !success ? (
    <div className="md:grid md:grid-cols-[45%_55%] lg:grid-cols-[60%_40%] h-full">
      <div
        style={imageStyle}
        className="hidden relative md:grid  w-full place-content-center   bg-my-gray  "
      ></div>
      <div className="max-w-[600px] w-full px-6 md:px-10 mx-auto grid items-center h-full">
        <div>
          <header className="w-fit mt-4 mb-4  md:mb-6">
            <Link className="flex justify-start items-center gap-x-2" to="/">
              <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
              <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
            </Link>{" "}
          </header>
          <div>
            <h2 className="font-bold text-2xl ">Join our network</h2>
            <p className="mb-6 mt-2 text-black/60">
              We are here to support you.
            </p>
            <SecondaryButton
              onClick={() => googleLogin()}
              text="Sign up with Google"
            />
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className=" flex flex-col justify-between">
                  <div>
                    <div className="lg:grid lg:grid-cols-2 gap-x-4">
                      <FormField
                        name="first_name"
                        title="First Name*"
                        type="text"
                        error={!!(errors.first_name && touched.first_name)}
                      />
                      <FormField
                        name="last_name"
                        title="Last Name*"
                        type="text"
                        error={!!(errors.last_name && touched.last_name)}
                      />
                    </div>
                    <FormField
                      name="email"
                      title="Email*"
                      type="email"
                      error={!!(errors.email && touched.email)}
                    />

                    <div className=" mb-6 md:mb-12 relative">
                      <label
                        className=" mb-1 text-xs font-medium"
                        htmlFor="category"
                      >
                        Category*
                      </label>
                      <Field
                        as="select"
                        className={`${
                          !!(errors.category && touched.category)
                            ? "bg-red-200"
                            : ""
                        } " block w-full border h-12  pl-3 rounded focus:outline-none"`}
                        name="category"
                        category=""
                        id="biller_name"
                      >
                        <option value="">Select</option>
                        <option value="young mother">Young Mother</option>
                        <option value="medical practitioner">
                          Medical Practitioner
                        </option>
                        <option value="other">Other</option>
                      </Field>
                    </div>

                    <div className=" mb-6 md:mb-12 relative">
                      <label
                        className=" mb-1 text-xs font-medium"
                        htmlFor="password"
                      >
                        Password*
                      </label>
                      <div className="relative">
                        <Field
                          id="password"
                          className={`${
                            !!(errors.password && touched.password)
                              ? "bg-red-200"
                              : ""
                          } " block w-full border h-12  pl-3 rounded focus:outline-none"`}
                          name="password"
                          type={!showPassword ? "password" : "text"}
                          placeholder=""
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(() => !showPassword)}
                          className={`absolute right-4 top-[50%] -translate-y-[50%] `}
                        >
                          {!showPassword ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )}
                        </button>
                      </div>

                      <p className="text-red-700 text-xs mt-1 ">
                        <ErrorMessage name="password" />
                      </p>
                    </div>
                  </div>

                  <PrimaryButton
                    text="Sign Up"
                    loading={loading}
                    disable={loading}
                    type="submit"
                  />
                  <p className="flex items-center justify-center gap-x-1 mt-4">
                    Already have an account?{"  "}
                    <Link
                      to="/signin"
                      className=" link-underline link-underline-black font-semibold"
                    >
                      Log in
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        {showError && (
          <Toast
            close={() => setShowError(null)}
            message={showError ? showError : "Error"}
          />
        )}
      </div>
    </div>
  ) : (
    <SuccessScreen
      message="Please Click on the verification Link sent to your email."
      link={href}
    />
  );
};

export default SignUp;

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  first_name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});
const imageStyle = {
  backgroundImage: ` url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  //   backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
};
