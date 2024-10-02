import { createAppSlice } from "@/lib/createAppSlice";
import { User } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "./userActions";


export interface UserSliceState {
    users: User[];
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "failed" | "succeeded";
    user: User
    activeUsers: any[]
}

const initialState: UserSliceState = {
    users: [],
    activeUsers: [],
    loading: false,
    error: null,
    status: "idle",
    user: {
        firstName: " ",
        lastName: " ",
        nrcNo: " ",
        phoneNo: " ",
        address: " ",
        profilePic: " ",
        role: 0,
        email: " ",
        password: " ",
        emailToken: " ",
        isActive: false,
        isVerified: false,
    }

};


export const userSlice = createAppSlice({
    name: 'user',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({

        fetchStartUser: reducer((state => {
            state.status = 'loading';
            state.error = null
        })),

        fetchFailUser: reducer((state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload
        }),

        updateUsers: reducer((state, action: PayloadAction<User[]>) => {
            state.status = 'idle';
            state.users = action.payload;
        }),

        setActiveUsersState: reducer((state, action: PayloadAction<any[]>) => {
            state.activeUsers = action.payload
        }),

        getAllUserAsync: asyncThunk(
            async () => {
                try {
                    const response = await getAllUsers();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response.data
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            }, {
            pending: (state) => { state.status = "loading"; },
            fulfilled: (state, action) => { state.status = "idle"; state.users = action.payload; },
            rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
        }
        )
    }),

    selectors: {
        selectUsers: (user) => user.users,
        selectUserStatus: (user) => user.status,
        selectActiveUsers: (user) => user.activeUsers
    }
})

export const { fetchStartUser, fetchFailUser, updateUsers, getAllUserAsync, setActiveUsersState } = userSlice.actions
export const { selectUsers, selectUserStatus, selectActiveUsers } = userSlice.selectors