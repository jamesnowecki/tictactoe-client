import React from "react";
import styles from "./Board.module.scss";
import Square from '../Square';

const Board = ({gameState, squareHandleClick}) => {

  const { A1, A2, A3, B1, B2, B3, C1, C2, C3 } = gameState;

  return (
    <div className={styles.board}>
        <Square square={A1} handleClick={squareHandleClick} />
        <Square square={A2} handleClick={squareHandleClick} />
        <Square square={A3} handleClick={squareHandleClick} />
        <Square square={B1} handleClick={squareHandleClick} />
        <Square square={B2} handleClick={squareHandleClick} />
        <Square square={B3} handleClick={squareHandleClick} />
        <Square square={C1} handleClick={squareHandleClick} />
        <Square square={C2} handleClick={squareHandleClick} />
        <Square square={C3} handleClick={squareHandleClick} />
    </div>
  );
};

export default Board;