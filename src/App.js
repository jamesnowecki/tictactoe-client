import styles from './App.module.scss';
import React, { useState, useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:1984')

const App = () => {

  const [clientId, updateClientId] = useState('');
  const [gameId, updateGameId] = useState('');
  const [boardState, updateBoardState] = useState({});

  const executeMethod = (dataObj) => {
    console.log('executeMethodCalled with data', dataObj)
    const { method, clientId } = dataObj;
    console.log(method)
    console.log(clientId)

    switch (method) {
      case 'connect':
        console.log("connect method received")
        checkClientId(clientId)
      case 'create':
        console.log('create method recieved')
        console.log('data:'. dataObj)
        break;
      case 'join':
        console.log('join method received')
        console.log('data:'. dataObj)
        break;
      case 'update':
        console.log('update method received')
        console.log('data:, dataObj')
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
      clientId: clientId
    }));
  };

  const joinServer = () => {
    client.send(JSON.stringify({
      method: 'join',
      clientId
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

  return (
    <div className={styles.App}>
      <p>Tic tac toe</p>
      <button onClick={() => createGame()}>create</button>
      <button onClick={() => joinServer()}>join</button>
      <button onClick={() => sendCurrentPlay()}>play</button>

    </div>
  );
}

export default App;
