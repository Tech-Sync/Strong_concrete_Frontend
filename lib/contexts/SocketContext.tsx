import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from "@socket.io/component-emitter"


const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ url: string | undefined, children: React.ReactNode }> = ({ url, children }) => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        
        if (!url) return;
        const socketIo = io(url);

        setSocket(socketIo);

        return () => {
            if (socketIo) socketIo.disconnect();
        };
    }, [url]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};