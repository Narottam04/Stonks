import logo from "../Assets/svg/cryptocademy-logo-sideways-light.svg";

const FormAppInfo = () => {
  return (
    <>
      <div className="hidden md:block  px-4  bg-gradient-to-b from-black to-gray-900 text-white xl:py-20 md:px-40 lg:px-20 xl:px-40">
        {/* logo */}
        <img src={logo} className="w-3/4 translate-x-[-10%] " alt="cryptocademy logo" />

        <div className="flex space-x-3 mb-8 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="flex-none w-6 h-6 mt-[0.3rem] text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h2 className="font-title text-2xl font-medium text-green-400">
              Discover the future of digital finance.
            </h2>
            <p className="font-text mt-3  text-gray-300">
              Cryptocademy provides a real-time, risk-free trading simulator that allows you to
              msater crypto trading and investing at zero cost. Hone your skills and feel confident
              with crypto trading and investing.
            </p>
          </div>
        </div>
        <div className="flex space-x-3 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="flex-none w-6 h-6 mt-[0.3rem] text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h2 className="font-title text-2xl font-medium text-green-400">
              Keep track of your virtual portfolios.
            </h2>
            <p className="font-text mt-3 text-gray-300">
              You decide how to utilize mock $100000 virutal USD! Buy, sell, trade, and profit.
              Learn how to become a savvy investor with cryptocademy.
            </p>
          </div>
        </div>
        <div className="flex space-x-3 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="flex-none w-6 h-6 mt-[0.3rem] text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h2 className="font-title text-2xl font-medium text-green-400">Compete Globally.</h2>
            <p className="font-text mt-3 text-gray-300">
              Do you have what it takes to be a better investor, compete globally with other users
              and become a better investor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAppInfo;
