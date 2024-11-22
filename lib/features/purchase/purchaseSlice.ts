import { createAppSlice } from "@/lib/createAppSlice";
import { Pagination, Purchase } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllPurchases } from "./purchaseActions";


interface PurchaseSliceState {
    purchases: Pagination<Purchase>;
    purchase: Purchase | null;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: PurchaseSliceState = {
    purchases: {
        details: {
            offset: 0,
            limit: 20,
            page: 0,
            pages: false,
            totalRecords: 0,
            showDeleted: false
        },
        data: []
    },
    loading: false,
    error: null,
    status: "idle",
    purchase: null
};


export const purchaseSlice = createAppSlice({
    name: 'purchase',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartPurchase: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailPurchase: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updatePurchase: reducer((state, action: PayloadAction<Purchase[]>) => {
            state.status = 'idle';
            state.purchases.data = action.payload;
        }),

        updatePurchaseState: reducer((state, action: PayloadAction<Purchase | null>) => {
            state.status = 'idle';
            state.purchase = action.payload;
        }),

        getAllPurchaseAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params

                try {
                    const response = await getAllPurchases(null, page, limit);

                    if (response.error) {
                        throw new Error(response.error);
                    }

                    return response;

                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }

            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.purchases = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectPurchases: (purchase) => purchase.purchases,
        selectPurchaseStatus: (purchase) => purchase.status,
        selectPurchase: (purchase) => purchase.purchase,
    }
})

export const { fetchStartPurchase, fetchFailPurchase, updatePurchase, getAllPurchaseAsync, updatePurchaseState } = purchaseSlice.actions
export const { selectPurchases, selectPurchaseStatus, selectPurchase } = purchaseSlice.selectors