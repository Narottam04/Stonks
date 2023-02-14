import { useState, forwardRef, useImperativeHandle } from "react";

const ErrorToast = forwardRef(({ message }, ref) => {
  const [showToast, setShowToast] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
    hide() {
      setShowToast(false);
    }
  }));

  return (
    <div
      id={showToast ? "show" : "hide"}
      className="flex w-[90%] md:w-auto p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2   z-50 "
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>

      <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{message}</div>

      <button
        onClick={() => setShowToast(false)}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
        data-collapse-toggle="alert-2"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
});

export default ErrorToast;
