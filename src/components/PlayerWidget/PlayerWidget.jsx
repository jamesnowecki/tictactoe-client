import React from "react";
import { useTictactoe } from '../../contexts/WebsocketProvider';
import { Card } from 'react-bootstrap';

const PlayerWidget = () => {

  const { gameState } = useTictactoe()
  const { clients} = gameState;

  return (
      <Card className='w-50 mb-3'>
        <Card.Body>
          <Card.Title>
              Current players
          </Card.Title>
          <Card.Text>
            {clients.map(client => {
                const inlineStyle = {
                    'color': client.color
                }
                return (<p key={client.color} style={inlineStyle}>{client.clientName}: {client.color}</p>)
            })}
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default PlayerWidget;