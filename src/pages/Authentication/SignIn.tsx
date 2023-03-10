import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHealth } from "react-icons/bi";
import SecondaryButton from "../../components/Button/SecondaryButton";
import PrimaryButton from "../../components/Button/PrimaryButton";
import bgImg from "../../assets/bg1.jpeg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import FormField from "../../components/FormField";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firbase";
import Toast from "../../components/UI/Toast";
import { signIn } from "../../lib/api";

const SignIn = () => {
  const [showError, setShowError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const date = new Date();
  // Initial values
  const initialValues = {
    email: sessionStorage.getItem("email")
      ? sessionStorage.getItem("email")!
      : "",
    password: "",
  };
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    authenticated && navigate("/");
  }, [authenticated, navigate]);

  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (result.user.emailVerified) {
        signIn({ email: result.user.email!, time_stamp: date.toISOString() });
        localStorage.setItem("email", result.user.email!);
        result.user.emailVerified && setAuthenticated(true);
      }
    } catch (error: any) {
      setShowError(error.message);
    }
  };

  // onSubmit
  const onSubmit = async (values: { email: string; password: string }) => {
    localStorage.setItem("email", values.email);
    setShowError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (result.user.emailVerified) {
        signIn({ email: result.user.email!, time_stamp: date.toISOString() });
      }
      // Signed in
      !result.user.emailVerified
        ? setShowError("Kindly verify your email")
        : setAuthenticated(true);
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          setShowError(err.message);

          break;
        case "auth/user/disabled":
        case "auth/user-not-found":
          setShowError("Email does not exist");
          break;
        case "auth/wrong-password":
          setShowError("Incorrect Password");
          break;
        default:
          setShowError(err.message);
      }
    }

    setLoading(false);
  };
  return (
    <div className="md:grid md:grid-cols-[45%_55%] lg:grid-cols-[60%_40%] h-full">
      <div
        style={imageStyle}
        className="hidden relative md:grid h-full  w-full place-content-center   bg-my-gray  "
      ></div>
      <div className="max-w-[600px] w-full px-6 md:px-10 mx-auto grid items-center h-full">
        <div>
          <header className="w-fit mt-4">
            <Link className="flex justify-start items-center gap-x-2" to="/">
              <BiHealth className="w-4 h-4 md:w-6 md:h-6" />
              <h1 className="text-lg md:text-xl font-bold">E-zineMH</h1>
            </Link>{" "}
          </header>
          <div className=" mt-4  md:mt-6">
            <h2 className="font-bold text-2xl ">Welcome back</h2>
            <p className="mb-6 mt-2 text-black/60">
              Welcome back! Please enter your details.
            </p>
            <SecondaryButton onClick={googleLogin} text="Sign in with Google" />
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
                    <FormField
                      name="email"
                      title="Email*"
                      type="email"
                      error={!!(errors.email && touched.email)}
                    />

                    <div className=" mb-6 md:mb-12 relative">
                      <label
                        className=" mb-1 text-xs font-medium"
                        htmlFor="password"
                      >
                        Password*
                      </label>
                      <div>
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

                      <div className="grid grid-cols-2 w-full">
                        <p className="text-red-700 text-xs mt-1 ">
                          <ErrorMessage name="password" />
                        </p>
                        <Link
                          to="/reset-password"
                          className="w-fit link-underline link-underline-black font-light text-sm place-self-end mt-1 hover:font-medium duration-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </div>

                  <PrimaryButton
                    text={"Sign In"}
                    loading={loading}
                    disable={loading}
                    type="submit"
                  />
                  <p className="flex items-center justify-center gap-x-1 mt-4">
                    Don't have an account?{"  "}
                    <Link
                      to="/signup"
                      className=" link-underline link-underline-black font-semibold"
                    >
                      Sign up
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
  );
};

export default SignIn;

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const imageStyle = {
  backgroundImage: ` url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  //   backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};
