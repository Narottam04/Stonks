import { lazy, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Utils/init-supabase";

import { useGetCoinDataQuery, useGetHistoricalDataQuery } from "../services/coinsDataApi";

import { HistoricalChart, HistoricalLineChart } from "../Components/CoinChart";
import ErrorToast from "../Components/ErrorToast";
import Loader from "../Components/Loader";

// import BuyCoins from "../Components/BuyCoins";
// import SellCoins from "../Components/SellCoins";
// import CoinStats from "../Components/CoinStats";
const BuyCoins = lazy(() => import("../Components/BuyCoins"));
const SellCoins = lazy(() => import("../Components/SellCoins"));
const CoinStats = lazy(() => import("../Components/CoinStats"));

const CurrencyDetailsPage = () => {
  const { id } = useParams();
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [addToGun, setAddToGun] = useState(false);
  const [chartDays, setChartDays] = useState("365");
  const [candleStickChart, setCandleStickChart] = useState(true);

  const [gunError, setGunError] = useState(false);
  const [gunErrorMessage, setGunErrorMessage] = useState("");

  const [toggleBuyCoinsModal, setToggleBuyCoinsModal] = useState(false);
  const [toggleSellCoinsModal, setToggleSellCoinsModal] = useState(false);

  const { data, error, isLoading, isSuccess } = useGetCoinDataQuery(id, { pollingInterval: 10000 });

  const {
    data: chartData,
    error: fetchChartDataError,
    isLoading: isChartLoading,
    isSuccess: chartDataSuccess
  } = useGetHistoricalDataQuery({
    id,
    chartDays
  });

  useEffect(() => {
    if (error || fetchChartDataError) {
      toastRef.current?.show();
    }
  }, [error, fetchChartDataError]);

  async function watchlistHandler(e) {
    e.preventDefault();
    setGunError(false);
    setGunErrorMessage("");

    setAddToGun(true);
    let { data: watchlist, error } = await supabase
      .from("watchlist")
      .select("coinId,userId")
      .eq("userId", `${currentUser.uid}`)
      .eq("coinId", `${data.id}`);

    if (watchlist.length === 0) {
      const { data: updateWatchlistData, error } = await supabase
        .from("watchlist")
        .upsert([{ coinId: data.id, userId: currentUser.uid }]);

      console.log("added to db/watchlist successfully");
      navigate("/app/watchlist");
      setAddToGun(false);
    } else {
      setGunErrorMessage("already added to watchlist");
      setGunError(true);
      setTimeout(() => {
        setGunError(false);
      }, 1500);
      setAddToGun(false);
      return;
    }
    // if(watchlist.includes(data.id)){
    //   setGunErrorMessage('already added to watchlist')
    //   setGunError(true)
    //   setTimeout(() => {
    //     setGunError(false)
    //   }, 1500);
    //   return
    // }
  }

  useEffect(() => {}, []);

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
    <section className="lg:px-4 py-2  mx-auto max-w-[1600px]">
      {isSuccess && (
        <BuyCoins data={data} modal={toggleBuyCoinsModal} setModal={setToggleBuyCoinsModal} />
      )}
      {isSuccess && (
        <SellCoins data={data} modal={toggleSellCoinsModal} setModal={setToggleSellCoinsModal} />
      )}
      {/* prettier-ignore */}
      {(isLoading || isChartLoading) && <Loader />}

      {error && <ErrorToast message="Something Went Wrong!" ref={toastRef} />}

      {gunError && (
        <p
          className="absolute left-1/2 -translate-x-1/2 top-5 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800  font-semibold"
          role="alert"
        >
          {gunErrorMessage ? gunErrorMessage : "Something went wrong!"}
        </p>
      )}

      {isSuccess && (
        <div className="mt-6 mx-2 md:mx-4 max-w-[1600px]">
          {/* back button */}
          <Link
            to="/app/market"
            className="md:hidden border-2 border-white w-10 h-10 rounded-full flex justify-center items-center mb-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6  text-white "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>

          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* coin data */}
            <div className="flex items-center space-x-2">
              <img src={data.image.large} className="w-12" alt={data.name} />
              <div>
                <p className="text-white font-title text-3xl font-bold">{data.name}</p>
                <p className="text-gray-300 text-md uppercase font-semibold">{data.symbol}</p>
              </div>
            </div>

            <div className="flex md:space-x-4 mt-4 md:mt-0">
              <div className="shadow-lg rounded-2xl  px-2 py-4 md:px-4 md:bg-gray-900">
                <div className="flex items-center">
                  <p className="text-sm md:text-lg  text-gray-50 font-title">PRICE</p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className=" text-lg text-left md:text-2xl text-white font-bold my-2">
                    ${data.market_data.current_price.usd}
                  </p>
                </div>
              </div>

              <div className="shadow-lg rounded-2xl  px-2 py-4 md:px-4 md:bg-gray-900">
                <div className="flex items-center">
                  <p className="text-sm md:text-lg  text-gray-50 font-title">24H</p>
                </div>
                <div className="flex flex-col justify-start">
                  <p
                    className={`text-lg text-left md:text-2xl font-bold my-2 ${
                      data?.market_data.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    } `}
                  >
                    {data?.market_data.price_change_percentage_24h >= 0 && "+"}
                    {data.market_data.price_change_percentage_24h.toFixed(3)}%
                  </p>
                </div>
              </div>

              <div className="shadow-lg rounded-2xl  px-2 py-4 md:px-4 md:bg-gray-900">
                <div className="flex items-center">
                  <p className="text-sm md:text-lg  text-gray-50 font-title">VOLUME</p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className=" text-lg text-left md:text-2xl text-white font-bold my-2">
                    {normalizeMarketCap(data.market_data.total_volume.usd)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 mx-2 md:mx-4 flex space-x-2">
        <button
          type="button"
          onClick={watchlistHandler}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-800 font-medium rounded-lg px-5 py-2 text-center mr-2 mb-2 text-"
        >
          {addToGun ? (
            <div>
              <svg
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span>Adding to Watchlist...</span>
            </div>
          ) : (
            <span>Watchlist</span>
          )}
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-800 font-medium rounded-lg px-8 py-2 text-center mr-2 mb-2 text-"
          onClick={() => setToggleBuyCoinsModal(true)}
        >
          Buy
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-800 font-medium rounded-lg px-8 py-2  text-center mr-2 mb-2 text-"
          onClick={() => setToggleSellCoinsModal(true)}
        >
          Sell
        </button>
      </div>
      {isSuccess && (
        <p className="text-white font-bold text-2xl font-title my-4 ml-2 md:ml-4">
          {data.name} Price Chart <span className="uppercase">{data.symbol}</span>{" "}
        </p>
      )}

      <div className="mb-6 ml-2 md:ml-4 inline-flex  rounded-md shadow-sm" role="group">
        <button
          onClick={() => setChartDays(() => "1")}
          type="button"
          className="py-2 px-4 font-text text-xs md:text-sm font-semibold  rounded-l-lg border  focus:z-10 focus:ring-2  bg-gray-900 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          24 Hours
        </button>
        <button
          onClick={() => setChartDays(() => "30")}
          type="button"
          className="py-2 px-4 font-text text-xs md:text-sm font-semibold  border-t border-b  focus:z-10 focus:ring-2  bg-gray-900 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          30 Days
        </button>
        <button
          onClick={() => setChartDays(() => "90")}
          type="button"
          className="py-2 px-4 font-text text-xs md:text-sm font-semibold   border  focus:z-10 focus:ring-2  bg-gray-900 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          3 Months
        </button>
        <button
          onClick={() => setChartDays(() => "365")}
          type="button"
          className="py-2 px-4 font-text text-xs md:text-sm font-semibold   border  focus:z-10 focus:ring-2  bg-gray-900 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          1 Year
        </button>
        <button
          onClick={() => setCandleStickChart(!candleStickChart)}
          type="button"
          className="py-2 px-4 font-text text-xs md:text-sm font-semibold  rounded-r-md border  focus:z-10 focus:ring-2  bg-gray-900 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
        >
          {candleStickChart ? (
            <img
              src="https://img.icons8.com/color-glass/96/000000/area-chart.png"
              className="inline-block w-5 h-5 "
              alt="line chart button"
            />
          ) : (
            <img
              src="https://img.icons8.com/color/48/000000/candle-sticks.png"
              className="inline-block w-5 h-5 "
              alt="candlestick chart button"
            />
          )}
        </button>
      </div>

      {/* <HistoricalChart id={id} /> */}
      {/* prettier-ignore */}
      {(isSuccess && chartDataSuccess && candleStickChart) && (
        <HistoricalChart id={id} data={chartData} days={chartDays} />
      )}
      {/* prettier-ignore */}
      {(isSuccess && chartDataSuccess && !candleStickChart) && (
        <HistoricalLineChart id={id} data={chartData} days={chartDays} name={data.name} />
      )}

      {isSuccess && <CoinStats data={data} />}
    </section>
  );
};

export default CurrencyDetailsPage;
