import styles from './App.module.scss';
import React, { useState, useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:1984')

const App = () => {

  const [clientId, updateClientId] = useState('');
  const [gameId, updateGameId] = useState('');
  const [boardState, updateBoardState] = useState({});

  const executeMethod = (dataObj) => {
    const { method } = dataObj.method;

    switch (method) {
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
        
        executeMethod(data)
        
      }
    };

    establishSocketConnection();
    

  })

  return (
    <div className={styles.App}>
      <p>Tic tac toe</p>
    </div>
  );
}

export default App;
