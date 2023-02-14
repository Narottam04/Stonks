import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../Context/AuthContext";
import ErrorToast from "../ErrorToast";

const Logout = () => {
  const { logout } = useAuth();
  let navigate = useNavigate();

  const toastRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function logoutHandler() {
    try {
      await logout();
      console.log("logged out user successfully");
      navigate("/");
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
        type="button"
        onClick={logoutHandler}
        className="text-white my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-text"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
