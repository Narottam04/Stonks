import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Utils/init-supabase";

const initialState = {
  data: {
    coinId: "USD",
    coinName: "Virtual USD",
    amount: 0
  },
  status: "idle"
};

export const fetchAvailableCoins = createAsyncThunk(
  "availableCoins/fetchAvailableCoin",
  async (id) => {
    // get available coins
    const res = await fetch(`/api/user/vusd?id=${id}`);

    if (!res.ok) {
      throw new Error(`Something went wrong!`);
    }

    const data = await res.json();
    return data;
  }
);

const availableCoinsSlice = createSlice({
  name: "availableCoins",
  initialState,
  reducers: {},
  //   extraReducers:(builder) => {
  //     builder.addCase(availableCoins.pending,(state,action) => {
  //         state.status= "loading"
  //     }),
  //     builder.addCase(availableCoins.fulfilled,(state,action) => {
  //         state.data = action.payload
  //         state.status = "success"
  //     }),
  //     builder.addCase(availableCoins.rejected,(state,action) => {
  //         state.status = "failed"
  //     })
  //   }
  extraReducers: {
    [fetchAvailableCoins.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAvailableCoins.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchAvailableCoins.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

export default availableCoinsSlice.reducer;
