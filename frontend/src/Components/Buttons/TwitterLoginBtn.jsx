import twitter from "../../Assets/svg/twitter.svg";

const TwitterLoginBtn = () => {
  return (
    <button
      aria-label="Continue with twitter"
      className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
    >
      <img src={twitter} alt="" width={24} height={24} />
      <p className="text-base font-medium ml-4 text-gray-700">Continue with Twitter</p>
    </button>
  );
};

export default TwitterLoginBtn;
