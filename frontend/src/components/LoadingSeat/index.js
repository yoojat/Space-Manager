import React from "react";
import styles from "./styles.scss";

const LoadingSeat = props => (
  <div className={styles.container}>
    <img
      src={require("images/loading2.png")}
      className={styles.spinner}
      alt="loading"
    />
  </div>
);

export default LoadingSeat;
