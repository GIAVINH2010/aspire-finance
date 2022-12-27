import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "./types";

const initialState: IAppState = {
  screen: {
    viewHeight: 0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setViewHeight: (state, action) => {
      state.screen.viewHeight = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setViewHeight } = appSlice.actions;

export default appSlice.reducer;
