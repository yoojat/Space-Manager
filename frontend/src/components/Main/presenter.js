import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Main = (props, context) => {
  return <div>메인창입니다</div>;
};

Main.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Main;
