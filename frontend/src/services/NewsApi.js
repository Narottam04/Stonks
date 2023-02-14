import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Utils/init-firebase";

export const NewsApi = createApi({
  reducerPath: "NewsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getNews: builder.query({
      queryFn: async () => {
        try {
          const newsCollectionRef = collection(db, "cryptoNews");
          const data = await getDocs(newsCollectionRef);
          const news = data.docs[0].data().news;
          return { data: news };
        } catch (error) {
          return { error: error };
        }
      }
    })
  })
});

export const { useGetNewsQuery } = NewsApi;
