import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllProductionAsync } from "./thunks";
import { Production } from "@/types/types";


interface defaultParams {
  name: string,
  address: string,
  phoneNo: string,
  tpinNo: string,
  email: string,
  status: string,
  id?: number,
}

export interface ProductionSliceState {
  productions: Production[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  productionModal: boolean;
  production: Production | defaultParams;
}

const initialState: ProductionSliceState = {
  productions: [],
  loading: false,
  error: null,
  status: "idle",
  productionModal: false,
  production: {
    name: "",
    address: "",
    phoneNo: "",
    tpinNo: "",
    email: "",
    status: "",
  }
};

export const productionSice = createSlice({
  name: "productions",
  initialState,
  reducers: {
    updateProduction: (state, action: PayloadAction<Production[]>) => {
      state.loading = false;
      state.productions = action.payload;
    },
    updateProductionState: (state, action: PayloadAction<Production | defaultParams>) => {
      state.loading = false;
      state.production = action.payload;
    },
    setProductionModal: (state, action: PayloadAction<boolean>) => {
      state.productionModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllProductionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productions = action.payload;
      });
  },
});


export const {  updateProduction, setProductionModal, updateProductionState} = productionSice.actions;
