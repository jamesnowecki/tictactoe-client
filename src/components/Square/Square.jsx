import React from "react";
import styles from "./Square.module.scss";

const Square = (props) => {

  const {square, handleClick } = props
  const { isOccupied, color, id } = square;

  const inlineStyle = {
      'background-color': color
  }
  return (
    <div 
     className={styles.square}
     style={inlineStyle}
     onClick={() => handleClick({
        isOccupied: isOccupied,
        id: id,
        color: color,
    })}>
    </div>
  );
};

export default Square;