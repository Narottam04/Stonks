import { useEffect } from "react";

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

  return (
    <>
      {fetchNewsError && <p className="text-red-400 text-xl">Something went Wrong</p>}
      {fetchNewsLoading && <Loader />}
      <section className="px-4 lg:px-4 py-2 lg:py-8 mx-auto max-w-[1600px]">
        <h2 className="mt-4 lg:mt-0 mb-8 text-2xl md:text-3xl font-extrabold leading-tight text-white font-title">
          Cryptocurreny News
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {fetchNewsSuccess &&
            news?.map((news) => (
              <a
                className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
                href={news.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="justify-between sm:flex font-title">
                  <div>
                    <h5 className="text-lg font-bold text-white">{news.name}</h5>
                    <p className="mt-1 text-xs font-medium text-gray-300">
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

                <div className="mt-4 sm:pr-8 font-text">
                  <p className="text-sm text-gray-400 line-clamp-4">{news.description}</p>
                </div>

                <dl className="flex mt-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-500">Published</dt>
                    <dd className="text-xs text-gray-500">{news.datePublished.substring(0, 10)}</dd>
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
