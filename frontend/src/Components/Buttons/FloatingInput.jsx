import { ErrorMessage, Field } from "formik";

const FloatingInput = ({ type, id, name, placeholder }) => {
  return (
    <div>
      <div className="relative">
        <Field
          autoComplete="off"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:borer-rose-600 bg-black "
        />
        <label
          htmlFor={name}
          className="absolute left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
        >
          {placeholder}
        </label>
        <ErrorMessage name={name}>
          {(errorMsg) => <p className="text-sm text-red-600">{errorMsg}</p>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default FloatingInput;
