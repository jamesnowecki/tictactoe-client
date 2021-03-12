import React from 'react';
import { useTictactoe } from '../../contexts/WebsocketProvider';
import AnarchLogo from '../../assets/anarch.png';
import PlayerWidget from '../PlayerWidget';
import Board from '../Board';
import {
  InputGroup,
  Button,
  Form,
  Navbar,
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';

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
  } = useTictactoe();

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
          <h3 className='mb-2'>
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
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title>
                Game complete!
            </Card.Title>
            <Card.Text>
              {resultJSX}
            </Card.Text>
            <Button
                variant='dark'
                onClick={
                  () => resetGame()
                }
              >
                Reset game
            </Button>
          </Card.Body>
        </Card>
      );
    };
  };

  return (
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
        <Row xs={1} sm={1} md={2}>
          <Col>
          <Container>
            <Form>
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
          </Container>
            {generatePlayerWidgetJSX(gameState)}
            {generateVictoryNotifier(gameState)}

          </Col>
          <Col>
            <Container>
            {generateBoardJSX(gameState)}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GameLanding;
