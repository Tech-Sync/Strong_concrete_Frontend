import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  materials: [],
  purchases: [],
  pruchaseAccounts: [],
  user: [],
  sales: [],
  status: "idle",
};

export const stockSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

//Types
export interface StockSliceState {
  value: number;
  status: "idle" | "loading" | "failed" | "success";
}
