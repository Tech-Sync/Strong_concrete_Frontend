import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

const useSocket = (url: string | undefined) => {

    if (!url) throw new Error('url not given')

    const socketInstance: Socket<DefaultEventsMap, DefaultEventsMap> = useMemo(() => {
        if (!socket) {
            socket = io(url);
        }
        return socket;
    }, [url]);

    useEffect(() => {
        // Connect socket
        socketInstance.connect();

        return () => {
            // Disconnect socket when the component unmounts or when the hook is no longer used
            if (socketInstance) socketInstance.disconnect();
        };
    }, [socketInstance]);

    return socketInstance;
};

export default useSocket;