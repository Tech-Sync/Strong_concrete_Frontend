import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllFrimAsync } from "./thunks";
import { Firm } from "@/types/types";


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
  firms: Firm[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  firmModal: boolean;
  firm: Firm | defaultParams;
}

const initialState: FirmSliceState = {
  firms: [],
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

export const firmSlice = createSlice({
  name: "firms",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFirm: (state, action: PayloadAction<Firm[]>) => {
      state.loading = false;
      state.firms = action.payload;
    },
    updateFirmState: (state, action: PayloadAction<Firm | defaultParams>) => {
      state.loading = false;
      state.firm = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    },
    setFirmModal: (state, action: PayloadAction<boolean>) => {
      state.firmModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFrimAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFrimAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllFrimAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.firms = action.payload;
      });
  },
});

//Types


export const { fetchStart, fetchFail, updateFirm, setFirmModal, updateFirmState} = firmSlice.actions;
