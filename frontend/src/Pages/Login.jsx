import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useAuth } from "../Context/AuthContext";

import FloatingInput from "../Components/Buttons/FloatingInput";
import FloatingPasswordInput from "../Components/Buttons/FloatingPasswordInput";
import ErrorToast from "../Components/ErrorToast";
import FormAppInfo from "../Components/FormAppInfo";
import GoogleLoginBtn from "../Components/Buttons/GoogleLoginBtn";

const initialValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email Address").required("Required"),

  password: Yup.string()
    .min(6, "Password must be 6 charcters at minimum")
    .max(30, "Password is too big!")
    .required("Required")
});

function Login() {
  const { login, currentUser } = useAuth();
  let navigate = useNavigate();

  const toastRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function onSubmit(values, onSubmitProps) {
    console.log("login started!");
    const { email, password } = values;
    try {
      await login(email, password);
      console.log("logged in successfully");
      navigate("/app");
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/app");
    }
  }, [currentUser]);

  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="bg-black"
    >
      <ErrorToast message={errorMessage} ref={toastRef} />
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-black text-white ">
        <div className="w-full h-screen py-20 lg:py-32  px-4  mx-auto  xl:py-32 md:w-3/5 lg:w-4/5 xl:w-3/5">
          <h1 className="mb-8 -mt-3 text-2xl font-title font-extrabold leading-snug  text-left text-green-400 md:text-4xl font-title tracking-wide">
            Log In{" "}
          </h1>
          {/* email password signin */}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form autoComplete="off" className="divide-y divide-gray-200">
                  <div className="font-text text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
                    <FloatingInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                    />
                    <FloatingPasswordInput
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />

                    <Link to="/forgotPassword" className="text-sm ">
                      <p
                        className="font-medium text-[#1ed760] hover:text-[#1db954]
                                        mt-4"
                      >
                        {" "}
                        Forgot Password?
                      </p>
                    </Link>
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      aria-label="create my account"
                      className={`focus:ring-2 font-text  
                      ${
                        (!formik.isValid || formik.isSubmitting) &&
                        " focus:ring-gray-700 bg-gray-700 border hover:bg-gray-600"
                      } focus:ring-offset-2 focus:ring-green-600 text-sm font-bold leading-none text-white focus:outline-none bg-green-600 border rounded hover:bg-green-600 py-4 w-full  `}
                    >
                      {formik.isSubmitting ? "Logging You In..." : "Login To My Account"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <Link to="/signup" className="text-md my-8 flex justify-center">
            <p className="font-medium text-[#1ed760] hover:text-[#1db954] font-title">
              {" "}
              Don't have an account? Signup
            </p>
          </Link>
          {/* Social Provider signup */}
          {/* Turned off due to native android platform error for google sign in */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-100"> Or continue with </span>
            </div>
          </div>
          <div className="mt-8  space-y-4">
            <GoogleLoginBtn />
          </div>
          {/*  */}
        </div>
        <FormAppInfo />
      </div>
    </motion.div>
  );
}

export default Login;
