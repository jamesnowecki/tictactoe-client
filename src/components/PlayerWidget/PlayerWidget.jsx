import React from "react";
import styles from "./PlayerWidget.module.scss";
import { useTictactoe } from '../../contexts/WebsocketProvider';

const PlayerWidget = () => {

  const { gameState } = useTictactoe()
  const { clients} = gameState;

  return (
    <div className={styles.playerWidget}>
        <p className={styles.title}>Current players:</p>
        <div>
            {clients.map(client => {
                const inlineStyle = {
                    'color': client.color
                }
                return <p key={client.color} style={inlineStyle}>{client.clientName}: {client.color}</p>
            })}
        </div>
    </div>
  );
};

export default PlayerWidget;