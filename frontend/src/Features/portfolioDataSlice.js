import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const portfolioDataSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updatePortfolio: (state, action) => {
      return action.payload;
    }
  }
});

export const { updatePortfolio } = portfolioDataSlice.actions;

export default portfolioDataSlice.reducer;
