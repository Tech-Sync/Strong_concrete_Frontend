import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllMaterialAsync } from "./thunks";
import {  Material } from "@/types/types";

const initialState: MaterialSliceState = {
  materials: [],
  loading: false,
  error: null,
  status: "idle",
};

export const materiaSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMaterialSuccess: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.materials = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMaterialAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMaterialAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllMaterialAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload;
      });
  },
});

//Types
export interface MaterialSliceState {
  materials: Material[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}
