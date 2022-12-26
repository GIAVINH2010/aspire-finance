import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IDebitState } from "../types";

const initialState: IDebitState = {
  id: 0,
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
};

export const debitSlice = createSlice({
  name: "debit",
  initialState,
  reducers: {
    getDebitCard: (state) => {
      state.balance += 10000;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { getDebitCard } = debitSlice.actions;

// export const selectDebitBalance = (state: RootState): string =>
//   formatCurrency(state.debit.balance, false);

export default debitSlice.reducer;
