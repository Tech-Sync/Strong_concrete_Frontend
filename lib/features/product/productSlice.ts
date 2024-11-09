import { createAppSlice } from "@/lib/createAppSlice";
import { Pagination, Product } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts } from "./productActions";


export interface ProductSliceState {
    products: Pagination<Product>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: ProductSliceState = {
    products: {
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
};


export const productSlice = createAppSlice({
    name: 'product',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartProduct: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailProduct: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateProductState: reducer((state, action: PayloadAction<Product[]>) => {
            state.status = 'idle';
            state.products.data = action.payload;
        }),


        getAllProductAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params

                try {
                    const response = await getAllProducts(page, limit);
                    
                    if (response.error) {
                        throw new Error(response.error);
                    }

                    return response
                    
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.products = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectProducts: (product) => product.products,
        selectProductStatus: (product) => product.status,
    }
})

export const { fetchStartProduct, fetchFailProduct, getAllProductAsync, updateProductState } = productSlice.actions
export const { selectProducts, selectProductStatus, } = productSlice.selectors