import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useGetCoinsDataQuery, useGetGlobalCryptoDataQuery } from "../services/coinsDataApi";
import ErrorToast from "./ErrorToast";
import Loader from "./Loader";

const CoinsTable = () => {
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const [currency, setCurrency] = useState("usd");

  const [page, setPage] = useState(1);

  const { data, error, isLoading, isSuccess } = useGetCoinsDataQuery(
    { currency, page },
    { pollingInterval: 10000 }
  );

  const {
    data: globalCryptoData,
    // error: fetchGlobalCryptoError,
    isLoading: fetchGlobalCryptoLoading,
    isSuccess: fetchGlobalCryptoSuccess
  } = useGetGlobalCryptoDataQuery();

  useEffect(() => {
    if (error) {
      toastRef.current.show();
    }
  }, [error]);

  const handlePagination = (data) => {
    setPage(Number(data.selected + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
    <div className="z-10">
      {(isLoading || fetchGlobalCryptoLoading) && <Loader />}
      {error && <ErrorToast message="Something Went Wrong!" ref={toastRef} />}
      {fetchGlobalCryptoSuccess && (
        <div className="no-scrollbar flex  p-4 space-x-4 rounded-box w-screen overflow-scroll max-w-md md:max-w-full lg:flex-wrap">
          <div className="">
            <div className="  bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative">
              <img
                src="https://img.icons8.com/clouds/200/000000/bitcoin.png"
                alt="btc logo"
                className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="font-title text-sm leading-5 font-medium text-gray-400 truncate">
                    Total Market Cap
                  </dt>
                  <dd className="font-text mt-1 text-xl leading-9 font-semibold text-gray-200">
                    ${globalCryptoData.data.total_market_cap.usd.toFixed(4)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="">
            <div className="  bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative">
              <img
                src="https://img.clankapp.com/symbol/btc.svg"
                alt="btc logo"
                className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="font-title  text-sm leading-5 font-medium text-gray-400 truncate">
                    Active Cryptocurrencies
                  </dt>
                  <dd className="font-text mt-1 text-3xl leading-9 font-semibold text-gray-200">
                    {globalCryptoData.data.active_cryptocurrencies}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="">
            <div className=" bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative">
              <img
                src="https://img.icons8.com/fluency/96/000000/bullish.png"
                alt="btc logo"
                className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="font-title  text-sm leading-5 font-medium text-gray-400 truncate">
                    24h Market Cap Change
                  </dt>
                  <dd
                    className={`font-text mt-1 text-3xl leading-9 font-semibold ${
                      globalCryptoData.data.market_cap_change_percentage_24h_usd >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    } `}
                  >
                    {globalCryptoData.data.market_cap_change_percentage_24h_usd.toFixed(4)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* more global stats page */}
      {fetchGlobalCryptoSuccess && (
        <Link
          to="/app/market/globalStats"
          className="text-md  font-semibold text-green-400 px-4 underline"
        >
          Show more global stats.
        </Link>
      )}
      {/* coin table */}

      <ul className="md:px-4 flex flex-col space-y-1 pb-12 font-text text-white">
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
        {/* coin prices */}
        {isSuccess &&
          data?.map((coins, index) => (
            <li
              key={index}
              onClick={() => navigate(`/app/coin/${coins.id}`)}
              className="grid grid-cols-2 md:grid-cols-4 text-gray-500 py-2 px-1md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer border-b-2 border-gray-800 "
            >
              <div className="flex items-center space-x-2 ">
                <p className="pl-1">{index + 1}</p>
                <img
                  className="h-8 w-8 md:h-10 md:w-10 object-contain"
                  src={coins.image}
                  alt="cryptocurrency"
                  loading="lazy"
                />
                <div>
                  <p className=" w-64 truncate text-white font-semibold break-words">
                    {coins.name}
                  </p>
                  <div className="flex space-x-1">
                    <p>{coins.symbol}</p>
                    <p
                      className={`md:hidden w-24 md:w-40 ${
                        coins?.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                      } font-semibold`}
                    >
                      {coins?.price_change_percentage_24h >= 0 && "+"}
                      {coins?.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end ml-auto md:ml-0 ">
                <p className="w-28 md:w-40 text-white font-semibold">
                  ${coins.current_price}
                  <br />
                  <span className="md:hidden w-28 md:w-40 text-gray-500">
                    MCap: {normalizeMarketCap(coins.market_cap)}
                  </span>
                </p>
              </div>
              <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
                <p
                  className={`w-24 md:w-40 ${
                    coins?.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                  } font-semibold`}
                >
                  {coins?.price_change_percentage_24h >= 0 && "+"}
                  {coins?.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
              <div className="hidden md:flex items-center justify-end ml-auto md:ml-0 ">
                <p className="w-24 md:w-40  ">${coins.market_cap}</p>
              </div>
            </li>
          ))}
      </ul>
      {/* pagination */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={52}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePagination}
        containerClassName={`flex justify-center space-x-2 text-xs font-medium text-white`}
        pageClassName={`inline-flex items-center justify-center w-8 h-8 border text-white border-gray-100 rounded-full`}
        pageLinkClassName={`block w-8 h-8 leading-8 text-center text-white  border-green-600 rounded-full`}
        previousLinkClassName={`block w-8 h-8 leading-8 text-center text-white  bg-green-600 border-green-600 rounded-full`}
        nextLinkClassName={`block w-8 h-8 leading-8 text-center text-white  bg-green-600 border-green-600 rounded-full`}
      />
    </div>
  );
};

export default CoinsTable;
