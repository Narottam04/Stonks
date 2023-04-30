import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Loader from "../Components/Loader";
import { debounce } from "../Utils/debounce";

const Search = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState({});

  const navigate = useNavigate();

  const debouncedSearchResult = useCallback(
    debounce(async (search) => {
      if (search) {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://stonks-api.webdrip.in/api/stocks/search?search=${search}`
          );

          const data = await res.json();
          console.log(data);

          setSearchData(data);

          setIsLoading(false);
        } catch (error) {
          setError(error.message);
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearchResult(search);
  }, [search]);

  return (
    <section className="lg:px-4 py-4 lg:py-8 max-w-[1600px] font-text">
      {/* search Bar */}
      <div className="px-4">
        <label for="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className=" border w-full   text-sm rounded-lg  block  pl-10 p-2.5  bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for Stocks..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 text-md">Something went wrong!</p>
      ) : (
        <ul className="mx-8">
          {searchData !== undefined &&
            searchData?.quotes
              ?.filter((stock) => "shortname" in stock)
              .map((stock, index) => (
                <li
                  onClick={() =>
                    navigate(`/app/coin/${stock.symbol}`, {
                      state: {
                        news: searchData?.news
                      }
                    })
                  }
                  key={index}
                  className="flex items-center text-gray-200 justify-between py-3 border-b-2 border-gray-800 cursor-pointer"
                >
                  <div className="flex items-center justify-start text-sm space-x-3">
                    {/* <img src={coin.large} alt={`${coin.name}`} className="w-7 h-7" /> */}
                    <div className="">
                      <p className="text-white text-md font-bold ">{stock.shortname}</p>
                      <p className="text-white text-xs">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-white font-medium">Score: {stock.score}</p>
                  </div>
                </li>
              ))}
        </ul>
      )}
    </section>
  );
};

export default Search;
