import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getAdditionalUserInfo } from "firebase/auth";

import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Utils/init-supabase";

import FloatingInput from "../Components/Buttons/FloatingInput";
import FloatingPasswordInput from "../Components/Buttons/FloatingPasswordInput";
import ErrorToast from "../Components/ErrorToast";
import FormAppInfo from "../Components/FormAppInfo";
// import GoogleLoginBtn from "../Components/Buttons/GoogleLoginBtn";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be 3 charcters at minimum")
    .max(30, "Username is too big!")
    .required("Required"),

  email: Yup.string().email("Invalid Email Address").required("Required"),

  password: Yup.string()
    .min(6, "Password must be 6 charcters at minimum")
    .max(30, "Password is too big!")
    .required("Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Required")
});

function Signup() {
  const { signUp, currentUser, updateProfileName, deleteUser } = useAuth();
  let navigate = useNavigate();
  const toastRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function onSubmit(values, onSubmitProps) {
    console.log("signup started!");
    const { email, password, username } = values;
    try {
      const response = await signUp(email, password);
      await updateProfileName(username);

      const { isNewUser } = getAdditionalUserInfo(response);
      if (isNewUser) {
        // add user data with networth on database
        const { error } = await supabase.from("users").insert([
          {
            userId: response.user.uid,
            username,
            email
          }
        ]);

        // if(error){
        //     console.log(error)
        //     await deleteUser(response.user)
        //     throw new Error({message:"Something Went Wrong! Please Try Again."})
        // }

        // give 100k coins to user
        const { error: addToPortfolioError } = await supabase.from("portfolio").insert([
          {
            userId: response.user.uid,
            coinId: "USD",
            coinName: "Virtual USD",
            image: "https://img.icons8.com/fluency/96/000000/us-dollar-circled.png",
            amount: 100000,
            coinSymbol: "vusd"
          }
        ]);
      }

      if (response.user) {
        console.log("created user successfully");
        navigate("/");
      }
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
    >
      <ErrorToast message={errorMessage} ref={toastRef} />
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-black text-white">
        <div className="w-full h-screen px-4 py-20 mx-auto  xl:py-32 md:w-3/5 lg:w-4/5 xl:w-3/5">
          <h1 className="font-title mb-8 -mt-3 text-2xl font-extrabold leading-snug  text-left text-green-400 md:text-4xl font-title tracking-wide">
            Sign up{" "}
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
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
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
                    <FloatingPasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      aria-label="create my account"
                      className={`focus:ring-2 
                                    ${
                                      (!formik.isValid || formik.isSubmitting) &&
                                      "focus:ring-gray-700 bg-gray-700 border hover:bg-gray-600"
                                    } focus:ring-offset-2 focus:ring-[#1db954] text-sm font-bold leading-none text-white focus:outline-none bg-[#1db954] border rounded hover:bg-[#1db954] py-4 w-full  `}
                    >
                      {formik.isSubmitting ? "Creating Your Account..." : "Create my account"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <Link to="/" className="text-md my-8 flex justify-center">
            <a href="#" className="font-title font-medium text-[#1ed760] hover:text-[#1db954]">
              {" "}
              Already have an account? Login{" "}
            </a>
          </Link>
          {/* Social Provider signup */}
          {/* Turned off due to native android platform error for google sign in */}
          {/* <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-black text-gray-100"> Or continue with </span>
                        </div>
                    </div>
                    <div className="mt-8  space-y-4">
                        <GoogleLoginBtn/>
                    </div> */}
        </div>
        <FormAppInfo />
      </section>
    </motion.div>
  );
}

export default Signup;
