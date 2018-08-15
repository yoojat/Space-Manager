import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CabinetSetForShiftCabinet = (props, context) => {
  const {
    cabinet_set,
    cabinetSetClickHandler,
    sel_cabinet_set,
    temp_cabinet_set,
    onMouseEnterCabinetSetButton,
    onMouseLeaveCabinetSetButton
  } = props;
  const css = {
    width: `${cabinet_set.width}%`,
    height: `${cabinet_set.height}%`,
    left: `${cabinet_set.xpos}%`,
    top: `${cabinet_set.ypos}%`
  };

  let classes = styles.cabinetSet;

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
      style={css}
      className={classes}
      onClick={cabinetSetClickHandler}
      onMouseEnter={onMouseEnterCabinetSetButton}
      onMouseLeave={onMouseLeaveCabinetSetButton}
    />
  );
};

CabinetSetForShiftCabinet.propTypes = {};

CabinetSetForShiftCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetSetForShiftCabinet;
