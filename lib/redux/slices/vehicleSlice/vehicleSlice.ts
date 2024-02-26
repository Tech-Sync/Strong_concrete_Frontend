import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "@/types/types";
import { getAllVehicleAsync } from "./thunk";

const initialState: VehicleSliceState = {
  vehicles: [],
  loading: false,
  error: null,
  status: "idle",
};

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    updateVehicleState: (state, action: PayloadAction<Vehicle[]>) => {
      state.loading = false;
      state.vehicles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVehicleAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllVehicleAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicles = action.payload;
      });
  },
});

//Types
export interface VehicleSliceState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

export const { updateVehicleState } = vehicleSlice.actions;
