import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketProvider = ({ children }) => {


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnected', () => {
            console.log('Disconneted from server');
        });



    }, [])

    

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )

};

export default SocketProvider;