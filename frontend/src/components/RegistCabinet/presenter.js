import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

// import SelectCabinet from 'components/SelectCabinet';
import { Link } from "react-router-dom";

const RegistCabinet = props => {
  if (props.loading) {
    return <Loading />;
  } else {
    return "사물함 선택";
  }
};

export default RegistCabinet;
