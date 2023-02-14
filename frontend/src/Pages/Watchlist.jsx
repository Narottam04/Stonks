import { useEffect } from "react";
import {
  // LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Link } from "react-router-dom";

import emptyWatchlistLogo from "../Assets/svg/emptyWatchlist.svg";

import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Utils/init-supabase";
import { useGetWatchlistDataQuery } from "../services/supabaseApi";

import Loader from "../Components/Loader";

const trailingActions = (coinId, userId, refetch) => {
  async function handleDelete() {
    try {
      const {
        // data,
        error
      } = await supabase
        .from("watchlist")
        .delete()
        .eq("coinId", `${coinId}`)
        .eq("userId", `${userId}`);
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TrailingActions>
      <SwipeAction
        className="bg-red-500 py-5 px-3  text-white font-bold cursor-pointer"
        onClick={() => handleDelete()}
      >
        Delete
      </SwipeAction>
      <SwipeAction>
        <Link to={`/app/coin/${coinId}`} className="bg-blue-500 py-5 px-3  text-white font-bold">
          View
        </Link>
      </SwipeAction>
    </TrailingActions>
  );
};

const Watchlist = () => {
  const { currentUser } = useAuth();

  // fetch watchlist coin data
  const {
    data: watchlistData,
    error,
    isLoading,
    // isFetching,
    isSuccess,
    refetch
  } = useGetWatchlistDataQuery(currentUser.uid);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1_000_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000_000)} T`;
    }
    if (marketCap > 1_000_000_000) {
      return `${Math.floor(marketCap / 1_000_000_000)} B`;
    }
    if (marketCap > 1_000_000) {
      return `${Math.floor(marketCap / 1_000_000)} M`;
    }
    if (marketCap > 1_000) {
      return `${Math.floor(marketCap / 1_000)} K`;
    }
    return marketCap;
  };

  return (
    <section className="lg:px-4 py-2 lg:py-8  max-w-[1600px]">
      <p className="text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0 mb-4 ml-3">
        WatchList
      </p>
      <p className="text-white font-semibold text-md font-title  ml-3">
        Swipe left to delete or view the coins.
      </p>
      {isLoading && <Loader />}
      {error && watchlistData.length !== 0 && (
        <p className="text-2xl text-red-400 px-4">Something went wrong</p>
      )}
      {/* coin table */}
      {watchlistData?.length === 0 && (
        <div className=" shadow-lg rounded-2xl  px-4 py-4 md:px-4 flex flex-col lg:justify-center align-center text-center max-w-xl m-auto">
          <img src={emptyWatchlistLogo} alt="empty watchlist" />
          <p className="text-white text-xl font-bold my-2 lg:text-center">
            Your watchlist is empty
          </p>
          <p className="text-gray-300 lg:text-center mb-5">
            Press the button to browse all the coins
          </p>
          <Link
            to="/app/market"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            View Coins
          </Link>
        </div>
      )}
      {isSuccess && watchlistData.length !== 0 && (
        <SwipeableList
          fullSwipe={false}
          type={ListType.IOS}
          className="md:px-4 flex flex-col space-y-1 pb-12 text-white font-text"
        >
          {/* Table Head */}
          <li className="grid grid-cols-2 md:grid-cols-4 text-gray-500 py-2 px-1md:px-5 cursor-pointer border-b-2 border-white ">
            <div className="flex justify-start items-center space-x-4">
              <p className="text-white pl-4">Name</p>
            </div>
            <div className="flex items-center justify-end ml-auto md:ml-0 ">
              <p className="w-28 md:w-40  text-white">Price</p>
            </div>
            <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
              <p className="w-24 md:w-40  text-white">24h Change</p>
            </div>
            <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
              <p className="w-24 md:w-40  text-white">Market Cap</p>
            </div>
          </li>
          {isSuccess &&
            watchlistData.length !== 0 &&
            watchlistData.map((coin, index) => (
              <SwipeableListItem
                trailingActions={trailingActions(coin.id, currentUser.uid, refetch)}
                key={index}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 text-gray-500 py-2 px-1md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer border-b-2 border-gray-800 xl:w-full">
                  <div className="flex items-center space-x-2 ">
                    <p className="pl-1">{index + 1}</p>
                    <img
                      className="h-8 w-8 md:h-10 md:w-10 object-contain"
                      src={coin.image.small}
                      alt="cryptocurrency"
                      loading="lazy"
                    />
                    <div>
                      <p className=" w-64 truncate text-white break-words font-semibold">
                        {coin.name}
                      </p>
                      <div className="flex space-x-1">
                        <p>{coin.symbol}</p>
                        <p
                          className={`md:hidden w-24 md:w-40 ${
                            coin?.market_data.price_change_percentage_24h >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          } font-semibold`}
                        >
                          {coin?.market_data.price_change_percentage_24h >= 0 && "+"}
                          {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end ml-auto md:ml-0 ">
                    <p className="w-28 md:w-40 text-white font-semibold">
                      ${coin?.market_data.current_price.usd}
                      <br />
                      <span className="md:hidden w-28 md:w-40 text-gray-500">
                        MCap: {normalizeMarketCap(coin?.market_data.market_cap.usd)}
                      </span>
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
                    <p
                      className={`w-24 md:w-40 ${
                        coin?.market_data.price_change_percentage_24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      } font-semibold`}
                    >
                      {coin?.market_data.price_change_percentage_24h >= 0 && "+"}
                      {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
                    <p className="w-24 md:w-40  ">${coin?.market_data.market_cap.usd}</p>
                  </div>
                </div>
              </SwipeableListItem>
            ))}
        </SwipeableList>
      )}
    </section>
  );
};

export default Watchlist;
