import { Link } from "react-router-dom";

import { AiOutlineBarChart, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineDashboard, MdOutlineMoreHoriz, MdOutlineStarBorder } from "react-icons/md";

const TabNavigation = () => {
  return (
    <div className="  w-full h-[200px] lg:hidden z-50 ">
      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 z-10 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl "
      >
        <div id="tabs" className="flex justify-between">
          <Link
            to="/app"
            className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          >
            {/* svg */}
            <MdOutlineDashboard className="inline-block text-white w-7 h-7 mb-1" />
            <span className="tab tab-whishlist block text-white text-xs">Dashboard</span>
          </Link>

          <Link
            to="/app/portfolio"
            className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          >
            <MdOutlineStarBorder className="inline-block text-white w-7 h-7 mb-1" />
            <span className="tab tab-home block text-white text-xs">Portfolio</span>
          </Link>

          <Link
            to="/app/search"
            className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          >
            {/* svg */}
            <AiOutlineSearch className="inline-block text-white w-7 h-7 mb-1" />
            <span className="tab tab-kategori block text-white text-xs">Search</span>
          </Link>

          <Link
            to="/app/watchlist"
            className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          >
            <AiOutlineBarChart className="inline-block text-white w-7 h-7 mb-1" />
            <span className="tab tab-whishlist block text-white text-xs">Watchlist</span>
          </Link>

          <Link
            to="/app/more"
            className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          >
            {/* svg */}
            <MdOutlineMoreHoriz className="inline-block text-white w-7 h-7 mb-1" />
            <span className="tab tab-account block text-white text-xs">More</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TabNavigation;
