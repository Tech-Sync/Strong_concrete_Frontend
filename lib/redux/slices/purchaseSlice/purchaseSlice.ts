import { Purchase } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllPurchaseAsync } from "./thunk";

const initialState: PurchaseSliceState = {
  purchases: [],
  loading: false,
  error: null,
  status: "idle",
  purchase: null
};

export const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    updatePurchases: (state, action: PayloadAction<Purchase[]>) => {
      state.loading = false;
      state.purchases = action.payload;
    },
    updatePurchaseState:(state, action: PayloadAction<Purchase | null>) => {
      state.loading = false;
      state.purchase = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPurchaseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPurchaseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllPurchaseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.purchases = action.payload;
      });
  },
});

//Types
interface PurchaseSliceState {
  purchases: Purchase[];
  purchase:  Purchase | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}


export const { updatePurchases, updatePurchaseState } = purchaseSlice.actions;