import React from "react";
import styles from "./Square.module.scss";
import { useTictactoe } from '../../contexts/WebsocketProvider';

const Square = (props) => {

  const { handlePlay } = useTictactoe();
  const { square } = props
  const { isOccupied, color, id } = square;

  const inlineStyle = {
      'backgroundColor': color
  }
  return (
    <div 
     className={styles.square}
     style={inlineStyle}
     onClick={() => handlePlay({
        isOccupied: isOccupied,
        id: id,
        color: color,
    })}>
    </div>
  );
};

export default Square;