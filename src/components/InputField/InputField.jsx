  
import React from "react";
import styles from "./InputField.module.scss";

const InputField = (props) => {

  const { type, placeholder, handleInput, value} = props
  return (
    <div className={styles.inputField}>
      <input type={type} value={value} placeholder={placeholder} onChange={event => handleInput(event.target.value)} />
    </div>
  );
};

export default InputField;