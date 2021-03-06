import React from "react";
import styles from "./Board.module.scss";
import Square from '../Square';

const Board = ({gameState}) => {
    
  const { A1, A2, A3, B1, B2, B3, C1, C2, C3 } = gameState;

  return (
    <div className={styles.board}>
        <Square square={A1} />
        <Square square={A2} />
        <Square square={A3} />
        <Square square={B1} />
        <Square square={B2} />
        <Square square={B3} />
        <Square square={C1} />
        <Square square={C2} />
        <Square square={C3} />
    </div>
  );
};

export default Board;