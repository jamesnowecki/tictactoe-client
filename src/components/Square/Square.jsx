import React from "react";
import styles from "./Square.module.scss";

const Square = (props) => {
  const { isOccupied, color, handleInput, gridId } = props;
  return (
    <div className={styles.square}>
        {gridId}
    </div>
  );
};

export default Square;