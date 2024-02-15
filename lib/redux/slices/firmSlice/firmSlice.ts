import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllFrimAsync } from "./thunks";
import { Firm } from "@/types/types";

const initialState: FirmSliceState = {
  firms: [],
  loading: false,
  error: null,
  status: "idle",
};

export const firmSlice = createSlice({
  name: "firms",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFirm: (state, action: PayloadAction<Firm[]>) => {
      state.loading = false;
      state.firms = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFrimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFrimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllFrimAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.firms = action.payload;
      });
  },
});

//Types
export interface FirmSliceState {
  firms: Firm[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

export const { fetchStart, fetchFail, updateFirm } = firmSlice.actions;
