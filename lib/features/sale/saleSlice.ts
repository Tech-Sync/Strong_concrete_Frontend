import { createAppSlice } from "@/lib/createAppSlice";
import { Pagination, Sale, WeeklySale } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllSales, getWeeklySale } from "./saleActions";


interface SalesSliceState {
    sales: Pagination<Sale>;
    weeklySales: WeeklySale[]
    sale: Sale | null;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: SalesSliceState = {
    sales: {
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
    weeklySales: [],
    loading: false,
    error: null,
    status: "idle",
    sale: null
};


export const saleSlice = createAppSlice({
    name: 'sale',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartSale: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailSale: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateSales: reducer((state, action: PayloadAction<Sale[]>) => {
            state.status = 'idle';
            state.sales.data = action.payload;
        }),

        updateSaleState: reducer((state, action: PayloadAction<Sale | null>) => {
            state.status = 'idle';
            state.sale = action.payload;
        }),

        clearWeeklySalesState: reducer((state) => {
            state.status = 'idle';
            state.weeklySales = [];
        }),

        getAllSaleAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params
                try {
                    const response = await getAllSales(page, limit);
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.sales = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        ),
        getWeeklySaleAsync: asyncThunk(
            async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
                try {
                    const response = await getWeeklySale(startDate, endDate);
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.weeklySale
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.weeklySales = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectSales: (sale) => sale.sales,
        selectSaleStatus: (sale) => sale.status,
        selectSale: (sale) => sale.sale,
        selectWeeklySales: (sale) => sale.weeklySales,
    }
})

export const { updateSales, fetchStartSale, fetchFailSale, getWeeklySaleAsync, getAllSaleAsync, clearWeeklySalesState, updateSaleState } = saleSlice.actions
export const { selectSales, selectSaleStatus, selectWeeklySales, selectSale } = saleSlice.selectors