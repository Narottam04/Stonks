import { useState } from "react";
import usd from "../Assets/svg/USD.svg";

const CoinStats = ({ data }) => {
  const [coinValue, setCoinValue] = useState(1);
  const [coinUsdPrice, setCoinUsdPrice] = useState(data.market_data.current_price.usd);

  const changeCoinValue = (e) => {
    setCoinValue(e.target.value);
    setCoinUsdPrice(data.market_data.current_price.usd * e.target.value);
  };

  const changeUsdValue = (e) => {
    setCoinUsdPrice(e.target.value);
    setCoinValue(e.target.value / data.market_data.current_price.usd);
  };

  return (
    <>
      {/* price converter */}
      <h2 className="text-xl md:text-3xl mx-4 text-white font-title mb-4 font-bold ">
        Price Converter
      </h2>
      <div className="flex  flex-col xl:flex-row items-center">
        <div className="w-[90vw] md:w-1/2 mx-2 md:mx-4 flex space-x-4 justify-between p-2 border-2 border-white rounded-lg">
          <div className="flex items-center space-x-2">
            <img src={data?.image?.small} className="" alt={data.name} />
            <div>
              <p className="text-white font-title text-xl font-bold">{data.name}</p>
              <p className="text-gray-300  uppercase font-semibold">{data.symbol}</p>
            </div>
          </div>
          <div className="mx-2">
            <input
              type="number"
              id="coinValue"
              name="coinValue"
              min="0"
              value={coinValue}
              onChange={changeCoinValue}
              className="w-20 md:w-40 h-full rounded-lg text-xl  font-title focus:ring-0 text-gray-50 bg-gray-900 px-2"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center items-center  my-2 border-2 border-white rounded-full w-9 h-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        </div>
        <div className="w-[90vw] md:w-1/2 mx-2 md:mx-4 flex justify-between p-2 border-2 border-white rounded-lg">
          <div className="flex items-center space-x-2">
            <img src={usd} width="40" height="45" className="" alt={data.name} />
            <div>
              <p className="text-white font-title  font-bold">United States Dollars</p>
              <p className="text-gray-300  uppercase font-semibold">USD</p>
            </div>
          </div>
          <div className="mx-2">
            <input
              type="number"
              min="0"
              id="coinUsdValue"
              name="coinUsdValue"
              value={coinUsdPrice}
              onChange={changeUsdValue}
              className="w-20 md:w-40 h-full rounded-lg text-xl  font-title focus:ring-0 text-gray-50 bg-gray-900 px-2"
            />
          </div>
        </div>
      </div>
      {/* coin Description */}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2  mt-8">
        <div className="mx-8">
          <h2 className="text-2xl md:text-3xl text-white font-title font-semibold mt-3 mb-2">
            <span className="uppercase">{data.symbol}</span> Price Live Data
          </h2>
          <p className="text-gray-200 text-lg ">
            The live {data.name} price today is ${data.market_data.current_price.usd} USD. We update
            our <span className="uppercase">{data.symbol}</span> to USD price in real-time.{" "}
            {data.name} is
            <span
              className={`font-bold  ${
                data?.market_data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              } px-1`}
            >
              {data?.market_data.price_change_percentage_24h >= 0 && "+"}
              {data.market_data.price_change_percentage_24h.toFixed(3)}%
            </span>
            in the last 24 hours. The current market cap ranking is #
            {data.market_data.market_cap_rank}, with a live market cap of $
            {data.market_data.market_cap.usd} USD. It has a circulating supply of{" "}
            {data.market_data.circulating_supply} <span className="uppercase">{data.symbol}</span>{" "}
            coins.
          </p>
        </div>

        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="font-bold text-2xl md:text-3xl py-4  text-black dark:text-white">
            {data.name} Statistics
          </p>
          <ul>
            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Price To USD</span>
              </div>
              <div>
                <p className="text-xl">${data.market_data.current_price.usd}</p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Rank</span>
              </div>
              <div>
                <p className="text-xl">#{data.market_cap_rank}</p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Total Volume</span>
              </div>
              <div>
                <p className="text-xl">${data.market_data.total_volume.usd}</p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Market Cap</span>
              </div>
              <div>
                <p className="text-xl">${data.market_data.market_cap.usd}</p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">All Time High</span>
              </div>
              <div>
                <p className="text-xl">${data.market_data.ath.usd}</p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Circulating Supply</span>
              </div>
              <div>
                <p className="text-xl">{data.market_data.circulating_supply}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2  mt-8">
        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="font-bold text-2xl md:text-3xl py-4  text-black dark:text-white">
            {data.name} Social Media Stats
          </p>
          <ul>
            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Twitter Followers</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.community_data.twitter_followers
                    ? data.community_data.twitter_followers
                    : "-"}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Reddit Avg Posts In 48H</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.community_data.reddit_average_posts_48h
                    ? data.community_data.reddit_average_posts_48h
                    : "-"}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Reddit Avg Comments In 48H</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.community_data.reddit_average_comments_48h
                    ? data.community_data.reddit_average_comments_48h
                    : "-"}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Reddit Subscribers</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.community_data.reddit_subscribers
                    ? data.community_data.reddit_subscribers
                    : "-"}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="font-bold text-2xl md:text-3xl py-4  text-black dark:text-white">
            {data.name} Social Media Links
          </p>
          <ul>
            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl ">{data.name} Official Website</span>
              </div>
              <div>
                <p className="text-xl text-right">
                  {data.links.homepage[0] ? (
                    <a
                      href={data.links.homepage[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      {data.name} Website
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Blockchain Website</span>
              </div>
              <div>
                <p className="text-xl text-right">
                  {data.links.homepage[0] ? (
                    <a
                      href={data.links.blockchain_site[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      {data.name} Transactions
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Official Forum</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.links.official_forum_url[0] ? (
                    <a
                      href={data.links.official_forum_url[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      {data.name} Forum
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Chat URL</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.links.chat_url[0] ? (
                    <a
                      href={data.links.chat_url[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      {data.name} Chat
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">Reddit Url</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.links.subreddit_url ? (
                    <a
                      href={data.links.subreddit_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      Reddit url
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">GitHub Repo</span>
              </div>
              <div>
                <p className="text-xl">
                  {data.links.repos_url.github[0] ? (
                    <a
                      href={data.links.repos_url.github[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline"
                    >
                      GitHub URL
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2  mt-8">
        <div className=" shadow-lg mx-auto rounded-2xl bg-black w-[90%]">
          <p className="font-bold text-2xl md:text-3xl py-4  text-black dark:text-white">
            {data.name} Percentage Change
          </p>
          <ul>
            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">1H</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_1h_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_1h_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_1h_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">24 Hour</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_24h_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_24h_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_24h_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">7 Days</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_7d_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_7d_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_7d_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">14 Days</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_14d_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_14d_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_14d_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">30 Days</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_30d_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_30d_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_30d_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">60 Days</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_60d_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_60d_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_60d_in_currency.usd}%
                </p>
              </div>
            </li>

            <li className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 ">
              <div className="flex items-center justify-start text-sm">
                <span className="text-xl">1 Year</span>
              </div>
              <div>
                <p
                  className={`text-xl text-left font-bold my-2 ${
                    data?.market_data.price_change_percentage_1y_in_currency.usd >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } `}
                >
                  {data?.market_data.price_change_percentage_1y_in_currency.usd >= 0 && "+"}
                  {data.market_data.price_change_percentage_1y_in_currency.usd}%
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CoinStats;
