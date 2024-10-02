import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationSliceState {
    notifications: any[],
    status: "idle" | "loading" | "failed" | "succeeded";
    error: string | null;
}

const initialState: NotificationSliceState = {
    notifications: [],
    status: 'idle',
    error: null
}

export const notificationSlice = createAppSlice({
    name: 'notification',
    initialState,
    reducers: ({ reducer }) => ({
        setNotificationsState: reducer((state, action: PayloadAction<any[]>) => {
            state.status = 'idle';
            state.notifications = action.payload
        })
    }),
    selectors: {
        selectNotifications: (notification) => notification.notifications,
    }
})


export const { setNotificationsState } = notificationSlice.actions
export const { selectNotifications } = notificationSlice.selectors

