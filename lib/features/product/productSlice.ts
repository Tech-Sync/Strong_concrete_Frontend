import { createAppSlice } from "@/lib/createAppSlice";
import { Product } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts } from "./productActions";


export interface ProductSliceState {
    products: Product[];
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: ProductSliceState = {
    products: [],
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
            state.products = action.payload;
        }),


        getAllProductAsync: asyncThunk(
            async () => {
                try {
                    const response = await getAllProducts();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.data
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