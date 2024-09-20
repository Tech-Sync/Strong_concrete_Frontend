import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { Delivery } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllDeliveries } from "./deliveryActions";



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

export const deliverySlice = createAppSlice({
    name: 'delivery',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        updateDelivery: reducer((state, action: PayloadAction<[]>) => {
            state.status = 'idle';
            state.deliveries = action.payload;
        }),
        getAllDeliveryAsync: asyncThunk(
            async () => {
                try {
                    const response = await getAllDeliveries();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.data
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.deliveries = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),
    selectors: {
        selectdeliveries: (delivery) => delivery.deliveries,
        selectdeliveryState: (delivery) => delivery,
        selectdeliveryModal: (delivery) => delivery.deliveryModal
    }
})

export const { updateDelivery, getAllDeliveryAsync } = deliverySlice.actions
export const { selectdeliveries, selectdeliveryState, selectdeliveryModal } = deliverySlice.selectors