import { Sale} from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllSaleAsync } from "./thunk";

const initialState: SalesSliceState = {
  sales: [],
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
      });
  },
});

//Types
interface SalesSliceState {
  sales: Sale[];
  sale:  Sale | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}


export const { updateSales, updateSaleState } = saleSlice.actions;