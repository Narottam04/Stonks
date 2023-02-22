import { useEffect } from "react";
import dayjs from "dayjs";

import { useGetNewsQuery } from "../services/NewsApi";

import Loader from "../Components/Loader";

const News = () => {
  const demoImage = "https://source.unsplash.com/fsSGgTBoX9Y";

  // get news
  const {
    data: news,
    isSuccess: fetchNewsSuccess,
    error: fetchNewsError,
    isLoading: fetchNewsLoading,
    refetch
  } = useGetNewsQuery();

  useEffect(() => {
    if (!news) {
      refetch();
    }
  }, []);

  
  useEffect(() => {
    const fetchData = async() => {
      try {
        console.log("response...................")
        const res = await fetch(`https://stonks-api.webdrip.in/api/news?news=finance`);
        console.log("response...................",res, typeof res)
        if (!res.ok) {
          throw new Error(`Something went wrong!`);
        }

        const data = await res.json();
        console.log(data)
        return { data: data };
      } catch (error) {
        return { error: error };
      }
    }

    fetchData()
}, []);

  return (
    <>
      {fetchNewsError && <p className="text-red-400 text-xl">Something went Wrong</p>}
      {fetchNewsLoading && <Loader />}
      <section className="px-4 lg:px-4 py-2 lg:py-8 mx-auto max-w-[1600px]">
        <h2 className="mt-4 lg:mt-0 mb-8 text-2xl md:text-3xl font-extrabold leading-tight text-white font-title">
          Latest Stock Market News
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {fetchNewsSuccess &&
            news?.items?.map((news) => (
              <a
                className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
                href={news?.link}
                rel="noreferrer"
                target="_blank"
              >
                <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="justify-between sm:flex">
                  <div>
                    <h5 className="font-title text-lg font-bold text-white">{news?.title}</h5>
                    <p className="font-title mt-2 text-xs font-medium text-gray-300">
                      By {news?.source?.text}
                    </p>
                  </div>

                  {/* <div className="flex-shrink-0 hidden ml-3 sm:block">
                  <img
                    className="object-cover w-16 h-16 rounded-lg shadow-sm"
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="News cover"
                  />
                </div> */}
                </div>

                {/* <div className="font-text mt-4 sm:pr-8">
                <p className="text-sm text-gray-400 line-clamp-4">{news.description}</p>
              </div> */}

                <dl className="font-text flex mt-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-500">Published</dt>
                    <dd className="text-xs text-gray-300">
                      {dayjs(news?.pubDate).format("DD MMMM YYYY ")}
                    </dd>
                  </div>
                </dl>
              </a>
            ))}
        </div>
      </section>
    </>
  );
};

export default News;
