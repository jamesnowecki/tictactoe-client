import React from "react";
import styles from "./Square.module.scss";

const Square = (props) => {

  const {square, handleInput } = props
  const { isOccupied, color, id } = square;

  const inlineStyle = {
      'background-color': color
  }
  return (
    <div className={styles.square} style={inlineStyle}>
    </div>
  );
};

export default Square;