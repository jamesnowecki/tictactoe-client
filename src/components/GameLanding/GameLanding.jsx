import styles from './GameLanding.module.scss';
import React, { useState, useEffect } from 'react';

import InputField from '../InputField';
import PlayerWidget from '../PlayerWidget';
import Board from '../Board';

const client = new WebSocket('ws://127.0.0.1:1984');

const GameLanding = () => {
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

  const generatePlayerWidgetJSX = (gameState) => {
    if (gameState.clients && gameState.clients.length > 0)  {
      return <div>
        <PlayerWidget clientArray={gameState.clients}/>
      </div>
    }
  };

  const generateBoardJSX = (gameState) => {
    //JPN - Show game only when active, or display final boardstate
    if((gameState && gameState.gameIsActive) || (gameState && gameState.gameResult)) {
      const { boardState } = gameState;
      return (
        <div >
          <h3 className={styles.turnTracker}>
            {clientId === activePlayerId ? `Your move` : `Opponent's move`}
          </h3>
          <Board gameState={boardState} squareHandleClick={handlePlay}/>
       </div>
      )
    }
  }

  const generateVictoryNotifier = (gameState) => {
    if (gameState && !gameState.gameIsActive && gameState.gameResult) {
      const { gameResult } = gameState;

      const resultJSX = gameResult.victoryAchieved ? (<h3>{gameResult.winningColor} wins!</h3>) : (<h3>Game resulted in a draw</h3>);

      return  (
        <div>
          {resultJSX}
          <button onClick={() => resetGame()}>Reset board</button>
        </div>
      );
    };
  };

  return (
    <div className={styles.gameLanding}>
      <h1>Tic tac toe - James Nowecki</h1>
      <div className={styles.gameIdInput}>
        <div className={styles.inputSection}>
          <p>Name:</p>
          <InputField value={clientName} handleInput={(e) => updateClientName(e)}/>
          {!gameState.gameIsActive ? (<button onClick={() => createGame()}>Create</button>) : null}
        </div>
        <div className={styles.inputSection}>
          <p>Game ID: Click create to generate, or enter an ID and click join</p>
          <InputField  value={gameId} handleInput={(e) => updateGameId(e)}/>
          {!gameState.gameIsActive? (<button onClick={() => joinServer()}>Join</button>) : null}
        </div>
      </div>
      <div className={styles.playerBox}>
        {generatePlayerWidgetJSX(gameState)}
        {generateVictoryNotifier(gameState)}
      </div>
      <div>
        {generateBoardJSX(gameState)}
      </div>
    </div>
  );
}

export default GameLanding;
