import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllDeliveryAsync } from "./thunks";
import { Delivery } from "@/types/types";

interface defaultParams {
  status: number | null,
}

export interface DeliverySliceState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  deliveryModal: boolean;
  delivery: Delivery | defaultParams;
}

const initialState: DeliverySliceState = {
  deliveries: [],
  loading: false,
  error: null,
  status: "idle",
  deliveryModal: false,
  delivery: { status: null }
};



export const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    updateDelivery: (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.deliveries = action.payload;
    },
    updateDeliveryState: (state, action: PayloadAction<Delivery | defaultParams>) => {
      state.loading = false;
      state.delivery = action.payload;
    },
    setDeliveryModal: (state, action: PayloadAction<boolean>) => {
      state.deliveryModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeliveryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDeliveryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(getAllDeliveryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveries = action.payload;
      });
  },
});



export const { updateDelivery, setDeliveryModal } = deliverySlice.actions;
