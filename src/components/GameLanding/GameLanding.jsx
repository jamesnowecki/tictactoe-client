import styles from './GameLanding.module.scss';
import React from 'react';
import { useTictactoe } from '../../contexts/WebsocketProvider';

import AnarchLogo from '../../assets/anarch.png';
import PlayerWidget from '../PlayerWidget';
import Board from '../Board';
import { InputGroup, Button, Form, Navbar, Container } from 'react-bootstrap'

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
        resetGame,
    } = useTictactoe()

  const generatePlayerWidgetJSX = (gameState) => {
    if (gameState.clients && gameState.clients.length > 0)  {
      return <div>
        <PlayerWidget />
      </div>
    }
  };

  const generateBoardJSX = (gameState) => {
    //JPN - Show game only when active, or display final boardstate
    if((gameState && gameState.gameIsActive) || (gameState && gameState.gameResult)) {
      return (
        <div >
          <h3 className={styles.turnTracker}>
            {clientId === activePlayerId ? `Your move` : `Opponent's move`}
          </h3>
          <Board />
       </div>
      );
    };
  };

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
    // <div className={styles.gameLanding}>
    <div>

      <Navbar  expand='lg' className='border-bottom border-dark mb-3'>
        <Navbar.Brand>
          <img
            alt='logo'
            src={AnarchLogo}
            width='30'
            height='30'
            className='d-inline-block align-top mr-2'
          />
          Tic Tac Toe - James Nowecki
        </Navbar.Brand>
      </Navbar>
      <Container>

      
      <div className={styles.gameIdInput}>

        <Form className='w-50'>
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <InputGroup className='mb-3'>
              <Form.Control
                value={clientName} 
                placeholder='Enter your player handle' 
                onChange={(e) => 
                updateClientName(e.target.value)}
              ></Form.Control>
              <InputGroup.Append>
                {!gameState.gameIsActive ? 
                (<Button 
                  variant="dark"
                  onClick={
                    () => createGame()
                  }
                >
                  Create game
                </Button>)
                : null}
              </InputGroup.Append>
            </InputGroup>
            <Form.Text className='text-muted'>How other players will identify you</Form.Text>
          </Form.Group>

          <Form.Group controlId='formGameId'>
            <Form.Label>Game ID</Form.Label>
            <InputGroup className='mb-3' >
              <Form.Control 
                value={gameId}
                placeholder='ID of game to join'
                onChange={(e) => 
                updateGameId(e.target.value)}
              ></Form.Control>
              <InputGroup.Append>
                {!gameState.gameIsActive ? 
                (<Button 
                  variant="dark"
                  onClick={
                    () => joinServer()
                  }
                >
                  Join game
                </Button>)
                 : null}
              </InputGroup.Append>
            </InputGroup>
            <Form.Text className='text-muted'>If you create a game, this will be given to you. You can also enter an ID shared by another player to join their game.</Form.Text>
          </Form.Group>
        </Form>

      </div>
      <div className={styles.playerBox}>
        {generatePlayerWidgetJSX(gameState)}
        {generateVictoryNotifier(gameState)}
      </div>
      <div>
        {generateBoardJSX(gameState)}
      </div>

      </Container>

    </div>
  );
}

export default GameLanding;
