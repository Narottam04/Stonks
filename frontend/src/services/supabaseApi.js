import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { supabase } from "../Utils/init-supabase";

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPortfolioData: builder.query({
      async queryFn(id) {
        try {
          let { data: portfolio, error } = await supabase
            .from("portfolio")
            .select(
              `
                coinId,
                coinSymbol,
                coinName,
                image,
                amount,
                coinAmount
              `
            )
            .eq("userId", `${id}`)
            .not("coinId", "eq", "USD");

          if (error) {
            throw new Error(error);
          }
          return { data: portfolio };
        } catch (error) {
          return { error: error };
        }
      }
    }),

    getWatchlistData: builder.query({
      queryFn: async (id) => {
        try {
          let { data: watchlistData } = await supabase
            .from("watchlist")
            .select("coinId")
            .eq("userId", `${id}`);

          if (watchlistData.length !== 0) {
            const watchlistId = watchlistData.map((item) => item.coinId);

            let watchlistPromise = [];
            watchlistId.forEach((coinId) => {
              // create a promise for each api call
              const request = fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
              watchlistPromise.push(request);
            });
            const res = await Promise.allSettled(watchlistPromise);

            const error = res.filter((result) => result.status === "rejected");

            if (error.length > 0) {
              throw new Error("Something went wrong! Please try again.");
            }

            const data = await Promise.all(res.map((r) => r?.value?.json()));

            return { data };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return { error: error };
        }
      }
    }),

    getPortfolioCoinData: builder.query({
      queryFn: async (id) => {
        try {
          let { data: portfolioData } = await supabase
            .from("portfolio")
            .select("coinId")
            .eq("userId", `${id}`)
            .not("coinId", "eq", "USD");

          if (portfolioData.length !== 0) {
            const portfolioId = portfolioData.map((item) => item.coinId);

            let portfolioPromise = [];
            portfolioId.forEach((coinId) => {
              // create a promise for each api call
              const request = fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
              portfolioPromise.push(request);
            });
            const res = await Promise.allSettled(portfolioPromise);

            const error = res.filter((result) => result.status === "rejected");

            if (error.length > 0) {
              throw new Error("Something went wrong! Please try again.");
            }

            const data = await Promise.all(res.map((r) => r?.value?.json()));

            return { data };
          } else {
            return { data: [] };
          }
        } catch (error) {
          return { error: error };
        }
      }
    }),

    getUserNetworth: builder.query({
      queryFn: async (id) => {
        try {
          let { data: portfolio, error } = await supabase
            .from("portfolio")
            .select(
              `
                coinId,
                coinName,
                image,
                amount
              `
            )
            .eq("userId", `${id}`);
          if (error) {
            throw new Error(error);
          }

          if (portfolio !== []) {
            const userNetworth = portfolio.reduce(
              (previousValue, currentCoin) => previousValue + currentCoin.amount,
              0
            );

            const { data, error } = await supabase
              .from("users")
              .update({ networth: userNetworth })
              .eq("userId", `${id}`);

            if (error) {
              throw new Error(error);
            }

            if (data) {
              return { data: userNetworth };
            }
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          return { error: error };
        }
      }
    }),
    getLeaderboard: builder.query({
      queryFn: async () => {
        try {
          let { data: users, error } = await supabase
            .from("users")
            .select("username,networth")
            .order("networth", { ascending: false })
            .limit(100);

          if (error) {
            throw new Error(error);
          }

          return { data: users };
        } catch (error) {
          return { error: error };
        }
      }
    }),
    fetchAvailableCoins: builder.query({
      queryFn: async (id) => {
        try {
          // get available coins
          let { data: availableUsdCoin, error } = await supabase
            .from("portfolio")
            .select("coinId,coinName,amount")
            .eq("userId", `${id}`)
            .eq("coinId", "USD");

          if (error) {
            throw new Error(error);
          }

          return { data: availableUsdCoin };
        } catch (error) {
          return { error: error };
        }
      }
    })
  })
});

export const {
  useGetPortfolioDataQuery,
  useGetWatchlistDataQuery,
  useGetUserNetworthQuery,
  useGetLeaderboardQuery,
  useFetchAvailableCoinsQuery,
  useGetPortfolioCoinDataQuery
} = supabaseApi;
