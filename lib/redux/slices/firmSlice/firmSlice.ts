import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFrimAsync } from "./thunks";
import { Firm } from "@/types/types";

const initialState: FirmSliceState = {
  firms: [],
  loading: false,
  error: false,
  status: "idle",
};

export const firmSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getFirmSuccess: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.firms = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFrimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFrimAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getFrimAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.firms = action.payload;
      });
  },
});

//Types
export interface FirmSliceState {
  firms: Firm[];
  loading: boolean;
  error: boolean;
  status: "idle" | "loading" | "failed" | "success";
}
