import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { coinsDataApi } from "../services/coinsDataApi";
import { NewsApi } from "../services/NewsApi";
import { supabaseApi } from "../services/supabaseApi";
import { postsApi } from "../services/postsApi";

import portfolioDataReducer from "../Features/portfolioDataSlice";
import availableCoinsReducer from "../Features/availableCoins";
import userReducer from "../Features/UserSlice";

export const store = configureStore({
  reducer: {
    [coinsDataApi.reducerPath]: coinsDataApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    portfolioData: portfolioDataReducer,
    availableCoins: availableCoinsReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinsDataApi.middleware,
      supabaseApi.middleware,
      NewsApi.middleware,
      postsApi.middleware
    )
});

setupListeners(store.dispatch);
