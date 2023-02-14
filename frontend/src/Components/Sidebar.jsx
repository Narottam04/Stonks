import React from "react";
import { Link } from "react-router-dom";

import { HiAcademicCap } from "react-icons/hi";
import { MdOutlineBusinessCenter, MdOutlineWatchLater, MdTravelExplore } from "react-icons/md";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineSearch,
  AiFillQuestionCircle
} from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";

import logo from "../Assets/svg/cryptocademy-logo-sideways-light.svg";

import { useAuth } from "../Context/AuthContext";

const Sidebar = ({ openSidebar, active }) => {
  const { currentUser } = useAuth();

  return (
    <aside
      className={`sidebar w-64 md:shadow transform ${
        openSidebar ? "translate-x-0" : "-translate-x-full "
      }   lg:translate-x-0 transition-transform duration-150 ease-in bg-black fixed top-0 left-0 h-[100vh] border-r-2 border-white`}
    >
      <div className="sidebar-header flex items-center ">
        <Link to="/app" className="inline-flex flex-row items-center">
          <img src={logo} alt="cryptocademy logo" />
        </Link>
      </div>
      <div className="sidebar-content px-4 ">
        <ul className="flex flex-col w-full">
          <li className="my-px">
            <Link
              to="/app"
              className={`
                        ${active === "home" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400 ">
                <AiOutlineHome className="text-white w-6 h-6 hover:text-black" />
              </span>
              <span className="ml-3 ">Home</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/search"
              className={`
                        ${active === "search" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <AiOutlineSearch className="text-white w-6 h-6 " />
              </span>
              <span className="ml-3">Search</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/market"
              className={`
                        ${active === "market" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <AiOutlineBarChart className="text-white w-6 h-6 " />
              </span>
              <span className="ml-3">Market</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/watchlist"
              className={`
                        ${
                          active === "watchlist"
                            ? "bg-gradient-to-tr from-gray-900 to-gray-700"
                            : ""
                        }
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <MdOutlineWatchLater className="text-white w-6 h-6 " />
              </span>
              <span className="ml-3">Watchlist</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/portfolio"
              className={`
                        ${
                          active === "portfolio"
                            ? "bg-gradient-to-tr from-gray-900 to-gray-700"
                            : ""
                        }
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <MdOutlineBusinessCenter className="text-gray-300 w-6 h-6 " />
              </span>
              <span className="ml-3">Portfolio</span>
            </Link>
          </li>
          {/*                                 
                <li className="my-px">
                    <Link
                    to="/app/ai"
                    className={
                        `
                        ${(active === 'aiPredection')? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `
                    }
                    >
                    <span className="flex items-center justify-center text-lg text-gray-400 ">
                        <AiOutlineRobot className='text-white w-6 h-6 '/>  
                    </span>
                    
                    <span className="ml-3">AI Predictions</span>
                    </Link>
                </li> */}

          <li className="my-px">
            <Link
              to="/app/learn"
              className={`
                        ${active === "learn" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400 ">
                <HiAcademicCap className="text-white w-6 h-6 " />
              </span>

              <span className="ml-3">Learn & Earn</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/leaderboard"
              className={`
                        ${
                          active === "leaderboard"
                            ? "bg-gradient-to-tr from-gray-900 to-gray-700"
                            : ""
                        }
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-gray-400 ">
                <BsFillBarChartFill className="text-white w-6 h-6 " />
              </span>

              <span className="ml-3">Global Leaderboard</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/news"
              className={`
                        ${active === "news" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-red-400">
                <MdTravelExplore className="text-gray-300 w-6 h-6 " />
              </span>
              <span className="ml-3">News</span>
            </Link>
          </li>

          <li className="my-px">
            <Link
              to="/app/faq"
              className={`
                        ${active === "faq" ? "bg-gradient-to-tr from-gray-900 to-gray-700" : ""}
                        flex flex-row items-center h-10 px-3 rounded-lg group text-gray-300  hover:bg-gradient-to-tr from-gray-900 to-gray-700 `}
            >
              <span className="flex items-center justify-center text-lg text-red-400">
                <AiFillQuestionCircle className="text-gray-300 w-6 h-6 " />
              </span>
              <span className="ml-3">F.A.Q</span>
            </Link>
          </li>

          <li>
            <Link
              to="/app/profile"
              className="flex items-center p-2 mt-5 space-x-4 justify-self-end cursor-pointer"
            >
              <img
                src={`https://avatars.dicebear.com/api/initials/${currentUser.displayName}.svg`}
                alt=""
                className="w-12 h-12 rounded-lg dark:bg-gray-500"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">{currentUser.displayName}</h2>
                <span className="flex items-center space-x-1">
                  <p className="text-xs hover:underline dark:text-gray-400">View profile</p>
                </span>
              </div>
            </Link>
          </li>

          <li className="mt-6">
            <p className="text-white font-semibold text-lg">Support Us</p>

            <a href="https://www.buymeacoffee.com/narottam" target="_blank" rel="noreferrer">
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=narottam&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
                alt="Support cryptocademy"
              />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
