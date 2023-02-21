import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Utils/init-firebase";

export const NewsApi = createApi({
  reducerPath: "NewsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getNews: builder.query({
      queryFn: async (query) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_STONKS_API_KEY}/api/news?news=${query}`);

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

export const { useGetNewsQuery } = NewsApi;
