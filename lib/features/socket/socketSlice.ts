import { useCurrentUser } from "@/hooks/useCurrentUser";
import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { DefaultEventsMap } from "@socket.io/component-emitter"
import { io, Socket } from 'socket.io-client';




interface SocketState {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    isConnected: boolean;
    activeUsers: any[];
    error: string | null;
}


const initialState: SocketState = {
    isConnected: false,
    socket: null,
    activeUsers: [],
    error: null
}

export const socketSlice = createAppSlice({
    name: 'socket',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        setActiveUsersState: reducer((state, action: PayloadAction<any[]>) => {
            state.activeUsers = action.payload
        }),
        setConnected: reducer((state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        }),
        initializeSocket: asyncThunk(
            async ({ url, userInfo }: { url: string, userInfo: any }, { getState, dispatch, rejectWithValue }) => {
                const state = getState() as { socket: SocketState };

                if (state.socket.socket) {
                    return state.socket.socket;
                }

                try {

                    const socket = io(url);


                    socket.on('connect', () => {
                        console.log('Connected to server');
                        setConnected(true);
                        if (userInfo?.id) socket.emit('userConnected', userInfo.id);
                    });

                    socket.on('disconnect', () => {
                        setConnected(false);
                        console.log('Disconnected from server');
                    });

                    socket.on('activeUsers', (users) => {
                        setActiveUsersState(users);
                    });


                    return socket;
                } catch (error) {
                    return rejectWithValue('Failed to initialize socket');
                }
            },
            {
                // @ts-ignore
                fulfilled: (state, action) => { state.isConnected = true; state.socket = action.payload; },
                rejected: (state, action) => { state.isConnected = false; state.error = action.error.message as string || null; },
            },
        ),
    }),
    selectors: {
        selectSocket: (socket) => socket.socket,
        selectIsConnected: (socket) => socket.isConnected,
        selectActiveUsers: (socket) => socket.activeUsers,
    }
})

export const { setActiveUsersState, initializeSocket, setConnected } = socketSlice.actions
export const { selectSocket, selectIsConnected, selectActiveUsers } = socketSlice.selectors