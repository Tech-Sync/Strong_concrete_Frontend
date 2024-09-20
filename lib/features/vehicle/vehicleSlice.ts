import { createAppSlice } from "@/lib/createAppSlice";
import { Vehicle } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllVehicles } from "./vehicleActions";


export interface VehicleSliceState {
    vehicles: Vehicle[];
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: VehicleSliceState = {
    vehicles: [],
    loading: false,
    error: null,
    status: "idle",
};


export const vehicleSlice = createAppSlice({
    name: 'vehicle',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartVehicle: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailVehicle: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateVehicleState: reducer((state, action: PayloadAction<Vehicle[]>) => {
            state.status = 'idle';
            state.vehicles = action.payload;
        }),


        getAllVehicleAsync: asyncThunk(
            async () => {
                try {
                    const response = await getAllVehicles();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.data
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.vehicles = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectVehicles: (vehicle) => vehicle.vehicles,
        selectVehicleStatus: (vehicle) => vehicle.status,
    }
})

export const { fetchStartVehicle, fetchFailVehicle, getAllVehicleAsync, updateVehicleState } = vehicleSlice.actions
export const { selectVehicles, selectVehicleStatus, } = vehicleSlice.selectors