import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllAccountsAsync } from "./thunks";
import {  PurchaseAccount } from "@/types/types";

const initialState: AccountSliceState = {
  acccounts: [],
  loading: false,
  error: null,
  status: "idle",
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    updateAccountsState: (state, action: PayloadAction<PurchaseAccount[]>) => {
      state.loading = false;
      state.acccounts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccountsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAccountsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllAccountsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.acccounts = action.payload;
      });
  },
});

//Types
export interface AccountSliceState {
  acccounts: PurchaseAccount[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

export const { updateAccountsState } = accountsSlice.actions;
