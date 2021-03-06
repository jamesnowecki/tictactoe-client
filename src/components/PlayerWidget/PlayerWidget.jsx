 import React from "react";
import styles from "./PlayerWidget.module.scss";

const PlayerWidget = (props) => {

  const { clientArray } = props;
  return (
    <div className={styles.playerWidget}>
        <p>Current joined players:</p>
        <div>
            {clientArray.map(client => {
                return <p key={client.color}>{client.clientName}: {client.color}</p>
            })}
        </div>
    </div>
  );
};

export default PlayerWidget;