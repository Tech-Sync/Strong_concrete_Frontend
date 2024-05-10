import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllProductAsync } from "./thunks";
import { Product } from "@/types/types";

const initialState: ProductSliceState = {
  products: [],
  loading: false,
  error: null,
  status: "idle",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductState: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      });
  },
});

//Types
export interface ProductSliceState {
  products: Product[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

export const { updateProductState } = productSlice.actions;
