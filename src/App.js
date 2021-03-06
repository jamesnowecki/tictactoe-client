import styles from './App.module.scss';
import React, { useState, useEffect } from 'react';
import {w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:1984')



const App = () => {

  const [clientId, updateClientId] = useState('');
  const [gameId, updateGameId] = useState('');
  const [boardState, updateBoardState] = useState({});

  const checkClientId = (id) => {
    console.log("checkId called with", id)
    if (id !== clientId) {
      updateClientId(id);
    }
  }

  useEffect(() => {

    const establishSocketConnection = () => {
      client.onopen = () => {
        console.log('websocket open');
      }
      client.onmessage = (message) => {
        console.log(message);

        const data = JSON.parse(message.data)
        checkClientId(data.clientId)
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
