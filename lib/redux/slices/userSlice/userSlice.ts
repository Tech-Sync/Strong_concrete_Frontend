import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/types";
import { getAllUserAsync } from "./thunk";

const initialState: UserSliceState = {
  users: [],
  loading: false,
  error: null,
  status: "idle"

};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      });
  },
});

//Types
export interface UserSliceState {
  users: User[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";

}

export const { updateUserState } = userSlice.actions;
