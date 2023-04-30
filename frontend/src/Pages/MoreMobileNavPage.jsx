import { RWebShare } from "react-web-share";
import { Link } from "react-router-dom";

import { BsBank, BsFillBarChartFill, BsGlobe2 } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";

import { useAuth } from "../Context/AuthContext";

const MoreMobileNavPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Link to="/app/profile" className="px-4 mt-3 flex justify-between items-center ">
        <div className="flex items-center p-2  space-x-4 justify-self-end cursor-pointer">
          <img
            src={`https://avatars.dicebear.com/api/initials/${currentUser.displayName}.svg`}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">{currentUser.displayName}</h2>
            <span className="flex items-center space-x-1">
              <p className="text-xs hover:underline dark:text-gray-400">View profile</p>
            </span>
          </div>
        </div>
        <AiOutlineRight className="inline-block text-white w-5 h-5 mb-1" />
      </Link>

      <div className="shadow-lg rounded-2xl bg-gray-900 py-6 mx-4 mt-4 space-y-4">
        <Link to="/app/news" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <BsGlobe2 className="inline-block text-gray-200 w-5 h-5 " />
            <h2 className="text-xl font-semibold text-gray-200">News</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>

        <Link to="/app/watchlist" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <MdOutlineWatchLater className="inline-block text-gray-200 w-6 h-6 " />
            <h2 className="text-xl font-semibold text-gray-200">Watchlist</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>

        <Link to="/app/leaderboard" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <BsFillBarChartFill className="inline-block text-gray-200 w-5 h-5 " />
            <h2 className="text-xl font-semibold text-gray-200">Global Leaderboard</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>

        <Link to="/app/social" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <BsBank className="inline-block text-gray-200 w-5 h-5 " />
            <h2 className="text-xl font-semibold text-gray-200">Stonks Social</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>

        <Link to="/app/billy" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <HiAcademicCap className="inline-block text-gray-200 w-6 h-6 " />
            <h2 className="text-xl font-semibold text-gray-200">Chat with Billy</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>
      </div>

      <p className="text-white font-bold text-lg  font-title mt-4 ml-3 px-2 md:px-4">
        Support Cryptocademy
      </p>
      <div className="shadow-lg rounded-2xl bg-gray-900 py-6  mx-4 mt-2 space-y-4 flex justify-center items-center ">
        <a
          href="https://www.buymeacoffee.com/narottam"
          target="_blank"
          rel="noreferrer"
          className=""
        >
          <img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=narottam&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
            alt="Support Cryptocademy"
          />
        </a>
      </div>

      {/* <p className="text-white font-bold text-lg  font-title mt-4 ml-3 px-2 md:px-4">About</p> */}

      <div className="shadow-lg rounded-2xl bg-gray-900 py-6 mx-4 mt-2 space-y-4">
        {/* <Link to="/app/news" className='px-4  flex justify-between items-center'>        
                <div className="flex justify-center space-x-2 items-center cursor-pointer">
                    <h2 className="text-xl font-semibold text-gray-200">Newsletter</h2>
                </div>
                <AiOutlineRight className='inline-block text-gray-200 w-5 h-5 mb-1'/>
            </Link> */}

        {/* <a
          href="https://cryptocademy.webdrip.in/privacy"
          className="px-4  flex justify-between items-center"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-200">Terms & Privacy</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </a> */}

        {/* <Link to="/app/leaderboard" className='px-4  flex justify-between items-center'>        
                <div className="flex justify-center space-x-2 items-center cursor-pointer">
                    <h2 className="text-xl font-semibold text-gray-200">Community Rules</h2>
                </div>
                <AiOutlineRight className='inline-block text-gray-200 w-5 h-5 mb-1'/>
            </Link> */}

        <RWebShare
          data={{
            text: "Stonks is an app that teaches people how to trade Stocks and invest in coins like GOOGLE, AMAZON, COCA COLA etc. User can analyze market data by viewing charts, top daily stocks news. Through our curated blogs and courses,users can also learn more about stock trading concepts..",
            url: "https://stonks-app.webdrip.in",
            title: "Stonks"
          }}
          onClick={() => console.log("shared successfully!")}
          className="px-4  flex justify-between items-center"
        >
          <div className="flex px-4 space-x-2 items-center cursor-pointer">
            <h2 className="text-md font-semibold text-green-400">
              Share Stonks app to your friends.
            </h2>
          </div>
        </RWebShare>
      </div>

      {/* <p className="text-white font-bold text-lg  font-title mt-4 ml-3 px-2 md:px-4">Support</p>

      <div className="shadow-lg rounded-2xl bg-gray-900 py-6 mx-4 mt-2 space-y-4">
        <a href="mailto:webdripdev@gmail.com" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-200">Contact Support</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </a>

        <Link to="/app/faq" className="px-4  flex justify-between items-center">
          <div className="flex justify-center space-x-2 items-center cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-200">FAQ</h2>
          </div>
          <AiOutlineRight className="inline-block text-gray-200 w-5 h-5 mb-1" />
        </Link>
      </div> */}
    </>
  );
};

export default MoreMobileNavPage;
