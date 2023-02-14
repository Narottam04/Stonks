import { useState } from "react";
import { ErrorMessage, Field } from "formik";

import showPassword from "../../Assets/svg/showPassword.svg";

const FloatingPasswordInput = ({ type, id, name, placeholder }) => {
  const [showPasswordText, setShowPasswordText] = useState(false);

  const showPasswordHandler = () => {
    setShowPasswordText(!showPasswordText);
  };
  return (
    <>
      <div className="relative flex ">
        <Field
          autoComplete="off"
          id={id}
          name={name}
          type={showPasswordText ? "text" : type}
          placeholder={placeholder}
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-300  bg-black focus:outline-none focus:borer-rose-600"
        />
        <label
          htmlFor={id}
          className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
        >
          {placeholder}
        </label>
        <img
          src={showPassword}
          onClick={showPasswordHandler}
          className="border-b-2 border-gray-300 "
          width={24}
          height={24}
          alt="Show Password"
        />
      </div>
      <ErrorMessage name={name}>
        {(errorMsg) => <div className="text-sm text-red-600">{errorMsg}</div>}
      </ErrorMessage>
    </>
  );
};

export default FloatingPasswordInput;
