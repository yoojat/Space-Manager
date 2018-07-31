import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";

const MiniMapSuperSeat = props => {
  const bgColor =
    props.now_using && moment(props.end_datetime).valueOf() > moment().valueOf()
      ? "red"
      : "#CBEEFB";
  return (
    <div
      className={styles.seat}
      style={{
        left: props.left + "%",
        top: props.top + "%",
        transform: `rotate(${props.rotate}+deg)`,
        backgroundColor: bgColor
      }}
    />
  );
};

MiniMapSuperSeat.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
};

export default MiniMapSuperSeat;
