import styles from './GameLanding.module.scss';
import React from 'react';

import InputField from '../InputField';
import PlayerWidget from '../PlayerWidget';
import Board from '../Board';
import { useTictactoe } from '../../contexts/WebsocketProvider';

const GameLanding = () => {

    const { 
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
    } = useTictactoe()

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
