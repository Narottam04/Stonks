import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { useGetTrendingCoinDataQuery } from "../services/coinsDataApi";
import { useGetNewsQuery } from "../services/NewsApi";
import {
  useFetchAvailableCoinsQuery,
  useGetLeaderboardQuery,
  useGetUserNetworthQuery,
  useGetWatchlistDataQuery
} from "../services/supabaseApi";

import Loader from "./Loader";

const DesktopDashboard = () => {
  const { currentUser } = useAuth();

  // fetch trending coin data
  const {
    data: trendingCoins,
    // error,
    isLoading,
    // isFetching,
    isSuccess
    // refetch
  } = useGetTrendingCoinDataQuery();

  // fetch watchlist coin data
  const {
    data: watchlistData,
    error: fetchWatchlistErr,
    isLoading: fetchWatchlistLoading,
    isSuccess: fetchWatchlistSuccess
  } = useGetWatchlistDataQuery(currentUser.uid);

  // Get user networth
  const {
    data: userNetworth,
    isSuccess: userNetworthSuccess
    // error: networthError
  } = useGetUserNetworthQuery(currentUser.uid);

  // get news
  const {
    data: news,
    isSuccess: fetchNewsSuccess,
    // error: fetchNewsError,
    isLoading: fetchNewsLoading
  } = useGetNewsQuery();

  // get available coins
  const {
    data: availableUsdCoins,
    isSuccess: fetchAvailableUsdCoinsSuccess,
    // error: fetchAvailableUsdCoinsError,
    isLoading: fetchAvailableUsdCoinsLoading,
    refetch: refetchAvailableCoins
  } = useFetchAvailableCoinsQuery(currentUser.uid);

  // get Leaderboard data
  const {
    data: leaderboard,
    isLoading: leaderboardIsLoading,
    isSuccess: fetchLeaderboardSuccess,
    error: fetchLeaderboardError
  } = useGetLeaderboardQuery();

  const demoImage = "https://source.unsplash.com/fsSGgTBoX9Y";

  useEffect(() => {
    refetchAvailableCoins();
  }, []);

  return (
    <>
      {/* loading State */}
      {(isLoading ||
        fetchWatchlistLoading ||
        fetchNewsLoading ||
        fetchAvailableUsdCoinsLoading ||
        leaderboardIsLoading) && <Loader />}
      {/* credit card */}
      <div className="w-80 m-auto md:m-0 md:w-96 h-56 lg:ml-8 bg-gradient-to-tr from-gray-900 to-gray-700  rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        <div className="w-full px-8 absolute top-8 font-text">
          <div className="flex justify-between">
            <div className="">
              <h4 className="">Name</h4>
              <p className="font-semibold tracking-wide">{currentUser.displayName}</p>
            </div>
            <img
              className="w-14 h-14"
              src="https://img.icons8.com/offices/80/000000/sim-card-chip.png"
              alt="card chip"
            />
          </div>
          <div className="pt-1">
            <h4 className="">Account Balance</h4>
            <p className="font-semibold tracking-more-wider">
              ${fetchAvailableUsdCoinsSuccess && availableUsdCoins[0]?.amount}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div className="">
                <h4 className="font-light text-xs">Networth</h4>
                <p className="font-semibold tracking-wider text-sm">
                  {userNetworthSuccess && <span>${userNetworth}</span>}
                </p>
              </div>
              {/* <div className="">
                            <p className="font-light text-xs ">
                                Expiry
                            </p>
                            <p className="font-medium tracking-wider text-sm">
                                03/25
                            </p>
                        </div> */}

              <div className="">
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2  mt-8">
        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="font-tile text-white font-bold text-2xl md:text-3xl font-title my-4">
            Trending Coins
          </p>

          {isSuccess && (
            <div>
              <ul>
                {trendingCoins.coins.map((coin, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 "
                  >
                    <div className="flex items-center justify-start text-sm space-x-3">
                      <img src={coin.item.large} alt={`${coin.item.name}`} className="w-10 h-10" />
                      <div className="font-text">
                        <p className="text-white text-xl font-bold ">{coin.item.name}</p>
                        <p className="text-white text-sm">{coin.item.symbol}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-text text-xl">
                        <p className="text-white">${coin.item.price_btc.toFixed(9)}</p>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* watchlist data */}
        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="text-white font-bold text-2xl md:text-3xl font-title my-4">
            Your Watchlist
          </p>

          <ul>
            {fetchWatchlistErr ? (
              <div className=" shadow-lg rounded-2xl  px-4 py-4 md:px-4 bg-gray-900 flex flex-col ;lg:justify-center font-text">
                <p className="text-white text-xl font-bold my-2 lg:text-center">
                  Your watchlist is empty
                </p>
                <p className="text-white lg:text-center mb-5">
                  Press the button to browse all the coins
                </p>
                <Link
                  to="/app/market"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  View Coins
                </Link>
              </div>
            ) : (
              fetchWatchlistSuccess &&
              watchlistData.slice(0, 7).map((coin, index) => (
                <li
                  key={index}
                  className="flex items-center font-text text-gray-200 justify-between py-3 border-b-2 border-gray-800 "
                >
                  <div className="flex items-center justify-start text-sm space-x-3">
                    <img src={coin.image.large} alt={`${coin.name}`} className="w-10 h-10" />
                    <div className="">
                      <p className="text-white text-xl font-bold ">{coin.name}</p>
                      <p className="text-white uppercase text-sm">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-white font-bold">
                      ${coin.market_data.current_price.usd}
                      <br />
                    </p>
                    <p
                      className={`text-right ${
                        coin?.market_data.price_change_percentage_24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      } font-semibold`}
                    >
                      {coin?.market_data.price_change_percentage_24h >= 0 && "+"}
                      {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {/* leaderboard */}
      <div>
        <p className="text-white font-bold text-2xl md:text-3xl font-title my-4 px-4 mt-10 md:mt-10">
          Global Leaderboard
        </p>

        <ul className="px-2 font-text md:px-12 flex flex-col space-y-1 pb-12 text-white">
          {/* Table Head */}
          <li className="grid grid-cols-3 text-gray-500 py-2 px-1md:px-5 cursor-pointer border-b-2 border-white">
            <div className="">
              <p className="text-white pl-4">Rank</p>
            </div>
            <div className="flex items-center justify-start ml-auto md:ml-0 ">
              <p className="w-28 md:w-40  text-white break-all text-left">Player</p>
            </div>
            <div className="flex items-center justify-end ml-auto md:ml-0 ">
              <p className="w-24 md:w-40  text-white text-right mr-2">Networth</p>
            </div>
          </li>
          {fetchLeaderboardError ? (
            <p className="text-red-500 text-xl">Something went wrong</p>
          ) : (
            fetchLeaderboardSuccess &&
            leaderboard.slice(0, 5).map((user, index) => (
              <li
                key={index}
                className="grid grid-cols-3 text-gray-500 py-2 px-1 md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer border-b-2 border-gray-800 "
              >
                <div className="flex items-center space-x-2 ">
                  <p className="pl-1">{index + 1}</p>
                  {index + 1 === 1 && (
                    <img
                      src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-reward-and-badges-justicon-flat-justicon-1.png"
                      alt="gold trophy"
                      className="w-8 h-8"
                    />
                  )}
                  {index + 1 === 2 && (
                    <img
                      src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-baseball-justicon-flat-justicon.png"
                      alt="silver trophy"
                      className="w-8 h-8"
                    />
                  )}
                  {index + 1 === 3 && (
                    <img
                      src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-reward-and-badges-justicon-flat-justicon-4.png"
                      alt="3rd rank trophy"
                      className="w-8 h-8"
                    />
                  )}
                </div>
                <div className="flex items-center justify-start ml-auto md:ml-0 ">
                  <p className="w-28 md:w-40 truncate text-white font-medium">{user.username}</p>
                </div>
                <div className="flex items-center justify-end ml-auto md:ml-0 ">
                  <p className="w-28 md:w-40 break-all text-white font-medium text-right">
                    ${user.networth}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {/*News*/}
      <p className="text-white font-bold text-2xl md:text-3xl font-title my-4 px-4">
        Today Top Headlines
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-8 pt-4">
        {fetchNewsSuccess &&
          news?.slice(0, 6).map((news) => (
            <a
              className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
              href={news.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="justify-between sm:flex">
                <div>
                  <h5 className="font-title text-lg font-bold text-white">{news.name}</h5>
                  <p className="font-title mt-2 text-xs font-medium text-gray-300">
                    By {news.provider[0].name}
                  </p>
                </div>

                <div className="flex-shrink-0 hidden ml-3 sm:block">
                  <img
                    className="object-cover w-16 h-16 rounded-lg shadow-sm"
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="News cover"
                  />
                </div>
              </div>

              <div className="font-text mt-4 sm:pr-8">
                <p className="text-sm text-gray-400 line-clamp-4">{news.description}</p>
              </div>

              <dl className="font-text flex mt-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-500">Published</dt>
                  <dd className="text-xs text-gray-300">{news.datePublished.substring(0, 10)}</dd>
                </div>
              </dl>
            </a>
          ))}
      </div>
    </>
  );
};

export default DesktopDashboard;
