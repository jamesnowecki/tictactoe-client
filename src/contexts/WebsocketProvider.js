import React, { useContext, useState, useEffect } from 'react';

const REACT_APP_SERVER = 'ws://127.0.0.1:1984'

const WebsocketContext = React.createContext()

const client = new WebSocket(REACT_APP_SERVER);

export const useTictactoe = () => {
    return useContext(WebsocketContext)
}

export const WebsocketProvider = ({ children }) => {
    const [clientName, updateClientName] = useState('');
    const [clientId, updateClientId] = useState('');
    const [gameId, updateGameId] = useState('');
    const [gameState, updateGameState] = useState({});
    const [activePlayerId, updateActivePlayerId] = useState('');

    const executeMethod = (dataObj) => {
        const { method, clientId, gameState } = dataObj;
    
        switch (method) {
          case 'connect':
            checkClientId(clientId);
            break;
          case 'create':
            checkGameId(gameState.gameId);
            updateGameState(gameState);
            break;
          case 'join':
            updateGameState(gameState);
            break;
          case 'update':
            updateGameState(gameState);
            break;
          case 'reset':
            updateGameState(gameState);
            break;
          default:
            updateGameState(gameState)
        };
      };
    
    const checkClientId = (id) => {
        if (id !== clientId) {
            updateClientId(id);
        };
    };
    
    const checkGameId = (id) => {
        if (id !== gameId) {
            updateGameId(id);
        };
    };
    
    const createGame = () => {
        client.send(JSON.stringify({
            method: 'create',
            clientId: clientId,
        }));
    };
    
    const joinServer = () => {
        client.send(JSON.stringify({
            method: 'join',
            clientId: clientId,
            gameId: gameId,
            clientName: clientName
        }));
    };
    
    const sendCurrentPlay = (e) => {
        client.send(JSON.stringify({
            method: 'play',
            clientId: clientId,
            gameId: gameId,
            move: {
            moveSquareId: e.id
            }
        }));
    };
    
    const handlePlay = (e) => {
        if (!e.isOccupied
            && gameState.gameIsActive
            && clientId === activePlayerId
        ) {
            sendCurrentPlay(e)
        };
    };
    
    const resetGame = () => {
        client.send(JSON.stringify({
            method: 'reset',
            gameId: gameId
        }));
    };
    
    const value = {
        clientName,
        updateClientName,
        clientId,
        gameId,
        updateGameId,
        gameState,
        activePlayerId,
        createGame,
        joinServer,
        handlePlay,
        resetGame,
    };

    useEffect(() => {
        const establishSocketConnection = () => {
          client.onopen = () => {
            console.info('websocket open');
          }
    
          client.onclose = () => {
            console.info('websocket closed')
          }
    
          client.onmessage = (message) => {
            const data = JSON.parse(message.data)
            console.info(data)
            if (data.gameState && data.gameState.activePlayerId) {
              updateActivePlayerId(data.gameState.activePlayerId)
            }
    
            executeMethod(data)
          }
        };
    
        establishSocketConnection();
      });
    

    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    );
};