import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils";
import { IDebitCardPayload } from "../types";

export const fetchDebitCardThunk = createAsyncThunk(
  "debits/fetch",
  async () => {
    const { data } = await axiosInstance({
      method: "GET",
      url: "/debit",
    });
    return data;
  }
);

export const setSpendingLimitThunk = createAsyncThunk(
  "debits/setSpendingLimit",
  async (payload: IDebitCardPayload) => {
    const { data } = await axiosInstance({
      method: "PUT",
      url: "/debit",
      data: payload,
    });
    return data;
  }
);
