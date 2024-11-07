import { createAppSlice } from "@/lib/createAppSlice";
import { Pagination, Production } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllProductions } from "./productionActions";


interface defaultParams {
    SaleId: number | null,
    VehicleIds: Array<number> | null,
    status: number | null,
    id?: number,
}

export interface ProductionSliceState {
    productions: Pagination<Production>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
    productionModal: boolean;
    production: Production | defaultParams;
}

const initialState: ProductionSliceState = {
    productions: {
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
    productionModal: false,
    production: {
        SaleId: null,
        VehicleIds: null,
        status: null,
    }
};


export const productionSlice = createAppSlice({
    name: 'production',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartProduction: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailProduction: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateProduction: reducer((state, action: PayloadAction<Production[]>) => {
            state.status = 'idle';
            state.productions.data = action.payload;
        }),

        updateProductionState: reducer((state, action: PayloadAction<Production | defaultParams>) => {
            state.status = 'idle';
            state.production = action.payload;
        }),

        setProductionModal: reducer((state, action: PayloadAction<boolean>) => {
            state.productionModal = action.payload;
        }),

        getAllProductionAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params

                try {
                    const response = await getAllProductions(page, limit);
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }

            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.productions = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectProductions: (production) => production.productions,
        selectProductionStatus: (production) => production.status,
        selectProduction: (production) => production.production,
        selectProductionModal: (production) => production.productionModal,
    }
})

export const { fetchStartProduction, fetchFailProduction, updateProduction, getAllProductionAsync, setProductionModal, updateProductionState } = productionSlice.actions
export const { selectProductions, selectProductionStatus, selectProductionModal, selectProduction } = productionSlice.selectors