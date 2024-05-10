import { Sale, WeeklySale} from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllSaleAsync, getWeeklySaleAsync } from "./thunk";

const initialState: SalesSliceState = {
  sales: [],
  weeklySales:[],
  loading: false,
  error: null,
  status: "idle",
  sale: null
};

export const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    updateSales: (state, action: PayloadAction<Sale[]>) => {
      state.loading = false;
      state.sales = action.payload;
    },
    updateSaleState:(state, action: PayloadAction<Sale | null>) => {
      state.loading = false;
      state.sale = action.payload;
    },
    clearWeeklySalesState:(state) => {
      state.loading = false;
      state.weeklySales = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSaleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSaleAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllSaleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sales = action.payload;
      })
      .addCase(getWeeklySaleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeeklySaleAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getWeeklySaleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weeklySales = action.payload;
      });
  },
});

//Types
interface SalesSliceState {
  sales: Sale[];
  weeklySales:WeeklySale[]
  sale:  Sale | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}


export const { updateSales, updateSaleState, clearWeeklySalesState } = saleSlice.actions;