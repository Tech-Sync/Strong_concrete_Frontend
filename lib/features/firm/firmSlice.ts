import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk, RootState } from "@/lib/store";
import { Firm, Pagination } from "@/types/types";

import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllFirms } from "./firmActions";



interface defaultParams {
    name: string,
    address: string,
    phoneNo: string,
    tpinNo: string,
    email: string,
    status: string,
    id?: number,
}

export interface FirmSliceState {
    firms: Pagination<Firm>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
    firmModal: boolean;
    firm: Firm | defaultParams;
}

const initialState: FirmSliceState = {
    firms: {
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
    firmModal: false,
    firm: {
        name: "",
        address: "",
        phoneNo: "",
        tpinNo: "",
        email: "",
        status: "",
    }
};

export const firmSlice = createAppSlice({
    name: 'firm',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartFirm: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailFirm: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateFirm: reducer((state, action: PayloadAction<Firm[]>) => {
            state.status = 'idle';
            state.firms.data = action.payload;
        }),

        setFirmModal: reducer((state, action: PayloadAction<boolean>) => {
            state.status = 'idle';
            state.firmModal = action.payload;
        }),

        updateFirmState: reducer((state, action: PayloadAction<Firm | defaultParams>) => {
            state.status = 'idle';
            state.firm = action.payload;
        }),

        getAllFirmAsync: asyncThunk(
            async (params: { page?: string, limit?: string }) => {
                const { page, limit } = params
                try {
                    const response = await getAllFirms(page, limit);
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.firms = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),
    selectors: {
        selectFirms: (firm) => firm.firms,
        selectFirm: (firm) => firm.firm,
        selectFirmStatus: (firm) => firm.status,
        selectFirmModal: (firm) => firm.firmModal
    }
})

export const { fetchStartFirm, fetchFailFirm, updateFirm, setFirmModal, updateFirmState, getAllFirmAsync } = firmSlice.actions
export const { selectFirms, selectFirm, selectFirmStatus, selectFirmModal } = firmSlice.selectors