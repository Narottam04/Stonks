import github from "../../Assets/svg/github.svg";

const GithubLoginBtn = () => {
  return (
    <button
      aria-label="Continue with github"
      className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
    >
      <img src={github} alt="" width={21} height={20} />
      <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
    </button>
  );
};

export default GithubLoginBtn;
