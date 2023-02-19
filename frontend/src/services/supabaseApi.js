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
          const res = await fetch(`/api/user/allWatchlist?id=${id}`);

          if (!res.ok) {
            throw new Error(`Something went wrong!`);
          }

          const data = await res.json();

          return { data };
        } catch (error) {
          return { error: error };
        }
      }
    }),

    getPortfolioCoinData: builder.query({
      queryFn: async (id) => {
        try {
          // let { data: portfolioData } = await supabase
          //   .from("portfolio")
          //   .select("coinId")
          //   .eq("userId", `${id}`)
          //   .not("coinId", "eq", "USD");

          // if (portfolioData.length !== 0) {
          //   const portfolioId = portfolioData.map((item) => item.coinId);

          //   let portfolioPromise = [];
          //   portfolioId.forEach((coinId) => {
          //     // create a promise for each api call
          //     const request = fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
          //     portfolioPromise.push(request);
          //   });
          //   const res = await Promise.allSettled(portfolioPromise);

          //   const error = res.filter((result) => result.status === "rejected");

          //   if (error.length > 0) {
          //     throw new Error("Something went wrong! Please try again.");
          //   }

          //   const data = await Promise.all(res.map((r) => r?.value?.json()));

          //   return { data };
          // } else {
          //   return { data: [] };
          // }
          const res = await fetch(`/api/user/allPortfolio?id=${id}`);

          if (!res.ok) {
            throw new Error(`Something went wrong!`);
          }

          const data = await res.json();

          return { data };
        } catch (error) {
          return { error: error };
        }
      }
    }),

    getUserNetworth: builder.query({
      queryFn: async (id) => {
        try {
          const res = await fetch(`/api/user/networth?id=${id}`);

          if (!res.ok) {
            throw new Error(`Something went wrong!`);
          }

          const data = await res.json();

          return { data };
        } catch (error) {
          return { error: error };
        }
      }
    }),
    updateUserNetworth: builder.query({
      queryFn: async (id) => {
        try {
          const res = await fetch(`/api/user/networth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id
            })
          });

          if (!res.ok) {
            throw new Error("Something went wrong!");
          }

          const data = await res.json();

          return { data };
        } catch (error) {
          return { error: error };
        }
      }
    }),
    getLeaderboard: builder.query({
      queryFn: async () => {
        try {
          const res = await fetch(`/api/user/leaderboard`);

          if (!res.ok) {
            throw new Error(`Something went wrong!`);
          }

          const data = await res.json();

          return { data };
        } catch (error) {
          return { error: error };
        }
      }
    }),
    fetchAvailableCoins: builder.query({
      queryFn: async (id) => {
        try {
          // get available coins
          const res = await fetch(`/api/user/vusd?id=${id}`);

          if (!res.ok) {
            throw new Error(`Something went wrong!`);
          }

          const data = await res.json();

          return { data: data };
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
  useGetPortfolioCoinDataQuery,
  useUpdateUserNetworthQuery
} = supabaseApi;
