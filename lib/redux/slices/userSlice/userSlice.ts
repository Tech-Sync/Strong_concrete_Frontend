import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/types";
import { getAllUsersAsync } from "./thunk";

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
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
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
