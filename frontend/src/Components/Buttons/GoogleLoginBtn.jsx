import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithCredential
} from "firebase/auth";
import { Capacitor } from "@capacitor/core";

import google from "../../Assets/svg/google.svg";
import { useAuth } from "../../Context/AuthContext";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

import ErrorToast from "../ErrorToast";

const GoogleLoginBtn = () => {
  const { signInWithGoogle } = useAuth();
  let navigate = useNavigate();

  const toastRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function googleSignInHandler() {
    try {
      if (!Capacitor.isNativePlatform()) {
        const response = await signInWithGoogle();
        const { isNewUser } = getAdditionalUserInfo(response);
        console.log("isNewUser", isNewUser);
        if (isNewUser) {
          console.log("adding those dataaa");
          // add user data with networth on database
          const addUser = await fetch(`https://stonks-api.webdrip.in/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: response.user.uid,
              name: response.user.displayName,
              email: response.user.email
            })
          });

          const addUserRes = await addUser.json();

          if (!addUser.ok) {
            throw new Error(addUser);
          }

          // give 100k coins to user
          const addVirtualUsd = await fetch(`https://stonks-api.webdrip.in/api/user/addCoin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: response.user.uid
            })
          });
          const addUsdRes = await addVirtualUsd.json();

          if (!addVirtualUsd.ok) {
            throw new Error(addVirtualUsd);
          }
        }
      } else {
        // 1. Create credentials on the native layer
        const result = await FirebaseAuthentication.signInWithGoogle();
        // 2. Sign in on the web layer using the id token
        const credential = GoogleAuthProvider.credential(result.credential?.idToken);
        const auth = getAuth();
        await signInWithCredential(auth, credential);

        if (result?.additionalUserInfo.isNewUser) {
          // add user data with networth on database
          const addUser = await fetch(`https://stonks-api.webdrip.in/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: result?.user?.uid,
              name: result?.user?.displayName,
              email: result?.user?.email
            })
          });

          const addUserRes = await addUser.json();

          if (!addUser.ok) {
            throw new Error(addUser);
          }

          // give 100k coins to user
          const addVirtualUsd = await fetch(`https://stonks-api.webdrip.in/api/user/addCoin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: result.user?.uid
            })
          });
          const addUsdRes = await addVirtualUsd.json();

          if (!addVirtualUsd.ok) {
            throw new Error(addVirtualUsd);
          }
        }
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
