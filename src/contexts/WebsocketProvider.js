import React, { useContext } from 'react';

const WebsocketContext = React.createContext()

export const useWebsocket = () => {
    return useContext(WebsocketContext)
}

export const WebsocketProvider = ({ children }) => {

    return (
        <WebsocketContext.Provider value={{}}>
            {children}
        </WebsocketContext.Provider>
    )
}