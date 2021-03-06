import styles from './App.module.scss';
import React, { useState, useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket } from 'websocket';

import InputField from './components/InputField';
import PlayerWidget from './components/PlayerWidget';
import Board from './components/Board';

const client = new W3CWebSocket('ws://127.0.0.1:1984')

const App = () => {
  const [clientName, updateClientName] = useState('Your name');
  const [clientId, updateClientId] = useState('');
  const [gameId, updateGameId] = useState('Enter Game ID here or create a game');
  const [gameState, updateGameState] = useState({});
  const [boardState, updateBoardState] = useState({});

  const executeMethod = (dataObj) => {
    console.log('executeMethodCalled with data', dataObj)
    const { method, clientId, gameState } = dataObj;
    console.log(method)
    console.log(clientId)

    switch (method) {
      case 'connect':
        console.log("connect method received")
        checkClientId(clientId);
        break;
      case 'create':
        console.log('create method recieved')
        console.log('data:', dataObj)
        checkGameId(gameState.gameId);
        updateGameState(gameState);
        break;
      case 'join':
        console.log('join method received')
        console.log('data:', dataObj)
        updateGameState(gameState);
        break;
      case 'update':
        console.log('update method received')
        console.log('data:', dataObj)
    }
  }

  const checkClientId = (id) => {
    console.log("checkId called with", id);
    if (id !== clientId) {
      updateClientId(id);
    };
  };

  const checkGameId = (id) => {
    console.log("checkGameId called with", id);
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

  const sendCurrentPlay = () => {
    console.log(clientId)
    client.send(JSON.stringify({
      method: 'play',
      clientId
    }));
  };

  useEffect(() => {

    const establishSocketConnection = () => {
      client.onopen = () => {
        console.log('websocket open');
      }

      client.onclose = () => {
        console.log('websocket closed')
      }

      client.onmessage = (message) => {
        console.log(message);

        const data = JSON.parse(message.data)
        console.log(data)
        executeMethod(data)
      }
    };

    establishSocketConnection();
    
  })

  const generatePlayerWidgetJSX = (gameState) => {
    if (gameState.clients && gameState.clients.length > 0)  {
      return <div>
        <PlayerWidget clientArray={gameState.clients}/>
      </div>
    }
  }

  const mockBoard = {
    A1: {
      id: 'A1',
      isOccupied: true,
      color: 'blue'
    },
    A2: {
      id: 'A2',
      isOccupied: true,
      color: 'blue'
    },
    A3: {
      id: 'A3',
      isOccupied: false,
      color: 'white'
    },
    B1: {
      id: 'B1',
      isOccupied: false,
      color: 'white'
    },
    B2: {
      id: 'B2',
      isOccupied: true,
      color: 'red'
    },
    B3: {
      id: 'B3',
      isOccupied: true,
      color: 'red'
    },
    C1: {
      id: 'C1',
      isOccupied: true,
      color: 'blue'

    },
    C2: {
      id: 'C2',
      isOccupied: false,
      color: 'white',
    },
    C3: {
      id: 'C3',
      isOccupied: true,
      color: 'red'
    }
  }

  return (
    <div className={styles.App}>
      <p>Tic tac toe - James Nowecki</p>
      <div className={styles.gameIdInput}>
        <InputField value={clientName} handleInput={(e) => updateClientName(e)}/>
        <InputField  value={gameId} handleInput={(e) => updateGameId(e)}/>
      </div>
      <button onClick={() => createGame()}>create</button>
      <button onClick={() => joinServer()}>join</button>
      <button onClick={() => sendCurrentPlay()}>play</button>
      {generatePlayerWidgetJSX(gameState)}
      <div>
        <Board gameState={mockBoard} />
      </div>
    </div>
  );
}

export default App;
