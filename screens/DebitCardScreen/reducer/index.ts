import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

import { IDebitState } from "../types";
import { fetchDebitCardThunk, setSpendingLimitThunk } from "../thunks";

const initialState: IDebitState = {
  debitCard: {
    balance: 0,
    info: {
      cardName: "Mark Henry",
      cardNumber: "5647341124132020",
      cardThru: "12/20",
      cardCVV: "456",
    },
    spentAmount: 123456,
    spendingLimit: 674891,
    isSetSpendingLimit: true,
  },
};

export const debitSlice = createSlice({
  name: "debit",
  initialState,
  reducers: {
    unactiveSpendingLimit: (state) => {
      state.debitCard.isSetSpendingLimit = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDebitCardThunk.fulfilled, (state, action) => {
      state.debitCard = action.payload;
    });
    builder.addCase(setSpendingLimitThunk.fulfilled, (state, action) => {
      state.debitCard = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { unactiveSpendingLimit } = debitSlice.actions;

export default debitSlice.reducer;
