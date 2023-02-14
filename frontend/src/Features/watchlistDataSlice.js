import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle"
};

export const fetchWatchlistData = createAsyncThunk(
  "watchlistData/fetchData",
  async (watchlistId, thunkAPI) => {
    let watchlistPromise = [];

    watchlistId.forEach((id) => {
      // create a promise for each api call
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      watchlistPromise.push(request);
      return 1;
    });
    const res = await Promise.all(watchlistPromise);
    return res;
  }
);

const watchlistDataSlice = createSlice({
  name: "watchlistData",
  initialState,
  reducers: {},
  //   extraReducers:(builder) => {
  //     builder.addCase(fetchWatchlistData.pending,(state,action) => {
  //         state.status= "loading"
  //     }),
  //     builder.addCase(fetchWatchlistData.fulfilled,(state,action) => {
  //         state.data = action.payload
  //         state.status = "success"
  //     }),
  //     builder.addCase(fetchWatchlistData.rejected,(state,action) => {
  //         state.status = "failed"
  //     })
  //   }
  extraReducers: {
    [fetchWatchlistData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWatchlistData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchWatchlistData.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

// export const {} = watchlistDataSlice.actions

export default watchlistDataSlice.reducer;
