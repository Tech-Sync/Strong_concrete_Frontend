import { createAppSlice } from "@/lib/createAppSlice";
import { MessageNotification } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationSliceState {
    messages: MessageNotification[],
    status: "idle" | "loading" | "failed" | "succeeded";
    error: string | null;
}

const initialState: NotificationSliceState = {
    messages: [],
    status: 'idle',
    error: null
}

export const notificationSlice = createAppSlice({
    name: 'notification',
    initialState,
    reducers: ({ reducer }) => ({
        setMessagesState: reducer((state, action: PayloadAction<MessageNotification>) => {
            state.messages.push(action.payload);
        }),
        removeFromMessageState: reducer((state, action: PayloadAction<number>) => {
            console.log('removeFromMessageState reducer called');
            state.messages = state.messages.filter(message => message.id !== action.payload);
        })
    }),
    selectors: {
        selectMessages: (notification) => notification.messages,
    }
})


export const { setMessagesState, removeFromMessageState } = notificationSlice.actions
export const { selectMessages } = notificationSlice.selectors

