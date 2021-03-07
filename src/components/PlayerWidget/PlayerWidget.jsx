import React from "react";
import styles from "./PlayerWidget.module.scss";

const PlayerWidget = (props) => {

  const { clientArray } = props;

  

  return (
    <div className={styles.playerWidget}>
        <p className={styles.title}>Current players:</p>
        <div>
            {clientArray.map(client => {
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