import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CabinetSetButtonForEnroll = (props, context) => {
  const {
    cabinet_set,
    temp_cabinet_set,
    sel_cabinet_set,
    onMouseEnterCabinetSetButton,
    onMouseLeaveCabinetSetButton,
    onClickCabinetSetButton
  } = props;

  let classes = styles.cabinetsetButton;

  if (temp_cabinet_set) {
    classes =
      classes +
      ` ${temp_cabinet_set.id === cabinet_set.id ? styles.tempSelected : ""}`;
  }

  if (sel_cabinet_set) {
    classes =
      classes +
      ` ${sel_cabinet_set.id === cabinet_set.id ? styles.selected : ""}`;
  }

  return (
    <div
      className={classes}
      onMouseEnter={onMouseEnterCabinetSetButton}
      onMouseLeave={onMouseLeaveCabinetSetButton}
      onClick={onClickCabinetSetButton}
    >
      <div className={styles.content}>{cabinet_set.desc}</div>
    </div>
  );
};

CabinetSetButtonForEnroll.propTypes = {};

CabinetSetButtonForEnroll.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetSetButtonForEnroll;
