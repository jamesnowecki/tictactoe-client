import React from "react";
import styles from "./Board.module.scss";
import Square from '../Square';

const Board = (props) => {

  const { gameState } = props;
  return (
    <div className={styles.board}>
        <Square gridId={"A1"} />
        <Square gridId={"A2"} />
        <Square gridId={"A3"} />
        <Square gridId={"B1"} />
        <Square gridId={"B2"} />
        <Square gridId={"B3"} />
        <Square gridId={"C1"} />
        <Square gridId={"C2"} />
        <Square gridId={"C3"} />
    </div>
  );
};

export default Board;