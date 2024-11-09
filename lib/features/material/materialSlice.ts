import { createAppSlice } from "@/lib/createAppSlice";
import { Material, Pagination } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllMaterials } from "./materialActions";


export interface MaterialSliceState {
    materials: Pagination<Material>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: MaterialSliceState = {
    materials: {
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

export const materialSlice = createAppSlice({
    name: 'material',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartMaterial: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailMaterial: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateMaterial: reducer((state, action: PayloadAction<Material[]>) => {
            state.status = 'idle';
            state.materials.data = action.payload;
        }),

        getAllMaterialAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params
                
                try {
                    const response = await getAllMaterials(page, limit);

                    if (response.error) {
                        throw new Error(response.error);
                    }

                    return response
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.materials = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),
    selectors: {
        selectMaterials: (material) => material.materials,
        selectMaterialStatus: (material) => material.status,
    }
})

export const { fetchStartMaterial, fetchFailMaterial, updateMaterial, getAllMaterialAsync } = materialSlice.actions
export const { selectMaterials, selectMaterialStatus, } = materialSlice.selectors