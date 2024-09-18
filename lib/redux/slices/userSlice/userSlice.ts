import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/types";
import { getAllUsersAsync } from "./thunk";

const initialState: UserSliceState = {
  users: [],
  loading: false,
  error: null,
  status: "idle",
  user: {
    firstName: " ",
    lastName: " ",
    nrcNo: " ",
    phoneNo: " ",
    address: " ",
    role: 0,
    email: " ",
    password: " ",
    emailToken: " ",
    isActive: false,
    isVerified: false,
  }

};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<User[]>) => {
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
  user: User

}

export const { updateUsers } = userSlice.actions;
