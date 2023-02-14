import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getAdditionalUserInfo } from "firebase/auth";

import google from "../../Assets/svg/google.svg";
import { useAuth } from "../../Context/AuthContext";
import { supabase } from "../../Utils/init-supabase";

import ErrorToast from "../ErrorToast";

const GoogleLoginBtn = () => {
  const { signInWithGoogle } = useAuth();
  let navigate = useNavigate();

  const toastRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function googleSignInHandler() {
    try {
      const response = await signInWithGoogle();
      const { isNewUser } = getAdditionalUserInfo(response);
      if (isNewUser) {
        // add user data with networth on database
        const { data, error } = await supabase.from("users").upsert([
          {
            userId: response.user.uid,
            username: response.user.displayName,
            email: response.user.email
          }
        ]);

        // if(error){
        //     console.log(error)
        //     await deleteUser(response.user)
        //     alert("Something Went Wrong! Please Try Again.")
        // }

        // give 100k coins to user
        console.log(data);
        const { error: addToPortfolioError } = await supabase.from("portfolio").upsert([
          {
            userId: response.user.uid,
            coinId: "USD",
            coinName: "Virtual USD",
            image: "https://img.icons8.com/fluency/96/000000/us-dollar-circled.png",
            amount: 100000
          }
        ]);
      }

      console.log("logged in user successfully");
      navigate("/app");
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
      console.log(error);
    }
  }
  return (
    <>
      <ErrorToast message={errorMessage} ref={toastRef} />
      <button
        onClick={googleSignInHandler}
        aria-label="Continue with google"
        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 py-3.5 px-4 border rounded-lg border-gray-400 flex items-center w-full mt-10"
      >
        <img src={google} alt="" width={19} height={20} />
        <p className="text-base font-medium ml-4 text-gray-100">Continue with Google</p>
      </button>
    </>
  );
};

export default GoogleLoginBtn;
