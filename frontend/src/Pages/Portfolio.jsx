import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import {
  useFetchAvailableCoinsQuery,
  useGetPortfolioCoinDataQuery,
  useGetPortfolioDataQuery,
  useGetUserNetworthQuery
} from "../services/supabaseApi";

import emptyWatchlistLogo from "../Assets/svg/emptyWatchlist.svg";

import Loader from "../Components/Loader";

const Portfolio = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    data: portfolioData,
    error,
    isLoading,
    // isFetching,
    isSuccess,
    refetch: refetchPortfolioData
  } = useGetPortfolioDataQuery(currentUser.uid);

  const {
    data: portfolioCoinData,
    // error: fetchPortfolioCoinDataError,
    isLoading: fetchPortfolioCoinDataLoading,
    isSuccess: fetchPortfolioCoinDataSuccess,
    refetch: refetchPortfolioCoinData
  } = useGetPortfolioCoinDataQuery(currentUser.uid, { pollingInterval: 5000 });

  // get available coins
  const {
    data: availableUsdCoins,
    isSuccess: fetchAvailableUsdCoinsSuccess,
    // error: fetchAvailableUsdCoinsError,
    isLoading: fetchAvailableUsdCoinsLoading
    // refetch: refetchAvailableCoins
  } = useFetchAvailableCoinsQuery(currentUser.uid);

  // get coin percentage change
  function percentageChange(coinId, coinAmount, amount) {
    const coinData = portfolioCoinData.filter((coin) => coin.id === coinId);

    if (coinData.length !== 0) {
      const currentCoinPrice = coinData[0]?.market_data.current_price.usd;
      const oneCoinAmount = amount / coinAmount;
      const coinPercentageChange = ((currentCoinPrice - oneCoinAmount) / currentCoinPrice) * 100;

      return coinPercentageChange;
    }
    return;
  }

  // Get user networth
  const {
    data: userNetworth,
    isSuccess: userNetworthSuccess,
    // error: networthError,
    refetch: refetchNetworth
  } = useGetUserNetworthQuery(currentUser.uid);

  useEffect(() => {
    refetchPortfolioData();
    refetchNetworth();
    refetchPortfolioCoinData();
  }, []);

  return (
    <section className=" py-2 lg:py-8 mx-auto max-w-[1600px]">
      <p className="text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0  ml-3">
        Portfolio
      </p>
      {(isLoading || fetchPortfolioCoinDataLoading || fetchAvailableUsdCoinsLoading) && <Loader />}
      {error && <p className="text-red-400 text-xl">Something went wrong!</p>}
      {/* available coin and networth */}
      <div className="no-scrollbar flex overflow-scroll  p-4  rounded-box w-screen max-w-md md:max-w-full lg:flex-wrap  ">
        <div className="">
          <div className="  bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative mx-3 mt-1 ">
            <img
              src="https://img.icons8.com/clouds/200/000000/bitcoin.png"
              alt="btc logo"
              className="h-24 w-24  absolute opacity-50 -top-6 -right-6 md:-right-4"
            />
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="font-title text-sm leading-5 font-medium text-gray-400 truncate">
                  Virtual USD
                </dt>
                <div className="font-text mt-1 text-xl leading-9 font-semibold text-gray-200">
                  ${fetchAvailableUsdCoinsSuccess && availableUsdCoins[0]?.amount}
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="">
          <div className="  bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative mx-3 mt-1 ">
            <img
              src="https://img.icons8.com/fluency/96/000000/bullish.png"
              alt="btc logo"
              className="h-24 w-24  absolute opacity-50 -top-6 -right-6 md:-right-4"
            />
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="font-title text-sm leading-5 font-medium text-gray-400 truncate">
                  Networth
                </dt>
                <dd className="mt-1 font-text text-xl leading-9 font-semibold text-gray-200">
                  ${userNetworthSuccess && userNetworth}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* portfolio Table */}
      <ul className="md:px-4 font-text flex flex-col space-y-1 pb-12 text-white">
        {/* Table Head */}
        <li className="grid grid-cols-3 text-gray-500 py-2 px-1md:px-5 cursor-pointer border-b-2 border-white">
          <div className="flex justify-start items-center space-x-4">
            <p className="text-white pl-4">Name</p>
          </div>

          <div className="flex justify-center md:justify-start items-center space-x-4">
            <p className="text-white ">% Change</p>
          </div>

          <div className="flex items-center justify-start  ml-auto md:ml-0 ">
            <p className="w-28 md:w-40  text-white text-left px-3">Holdings</p>
          </div>
        </li>
        {isSuccess &&
          fetchPortfolioCoinDataSuccess &&
          portfolioData.map((coin, index) => {
            const coinPercentageChange = percentageChange(
              coin.coinId,
              coin.coinAmount,
              coin.amount
            );
            return (
              <li
                key={index}
                onClick={() => navigate(`/app/coin/${coin.coinId}`)}
                className="grid grid-cols-3 text-gray-500 py-2 px-1md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer border-b-2 border-gray-800 "
              >
                <div className="flex items-center space-x-2 ">
                  <p className="pl-1">{index + 1}</p>
                  <img
                    className="h-8 w-8 md:h-10 md:w-10 object-contain"
                    src={coin.image}
                    alt="cryptocurrency"
                    loading="lazy"
                  />
                  <div>
                    <p className=" w-24 md:w-64 text-white break-words">{coin.coinName}</p>
                    <div className="flex space-x-1">
                      <p>{coin.coinSymbol}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start items-center space-x-4">
                  {coinPercentageChange && (
                    <p
                      className={`text-center  ${
                        coinPercentageChange >= 0 ? "text-green-400" : "text-red-400"
                      } font-semibold`}
                    >
                      {coinPercentageChange >= 0 && "+"}
                      {coinPercentageChange.toFixed(2)}%
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-start ml-auto md:ml-0 ">
                  <p className="w-28 md:w-40 text-white font-semibold text-left break-words">
                    {coin.coinAmount ? coin.coinAmount : <span>${coin.amount}</span>}{" "}
                    {coin.coinAmount && coin.coinSymbol}
                    <br />
                    <span className="w-28 md:w-40 text-gray-500 text-left ">
                      {coin.coinAmount && <span>${coin.amount}</span>}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        {portfolioData && portfolioData.length === 0 && (
          <div className=" shadow-lg rounded-2xl  px-4 py-4 md:px-4 flex flex-col lg:justify-center align-center text-center max-w-xl m-auto">
            <img src={emptyWatchlistLogo} alt="empty watchlist" />
            <p className="text-white text-xl font-bold my-2 lg:text-center">
              Your portfolio is empty
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
      </ul>
    </section>
  );
};

export default Portfolio;
