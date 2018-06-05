import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CabinetSet = (props, context) => {
  const { cabinet_set, cabinetSetClickHandler, sel_cabinet_set, id } = props;
  const css = {
    width: `${cabinet_set.width}%`,
    height: `${cabinet_set.height}%`,
    left: `${cabinet_set.xpos}%`,
    top: `${cabinet_set.ypos}%`
  };

  let classes;
  if (sel_cabinet_set) {
    classes = `${styles.cabinetSet} ${
      sel_cabinet_set.id === id ? styles.selected : ""
    }`;
  } else {
    classes = styles.cabinetSet;
  }

  return (
    <div style={css} className={classes} onClick={cabinetSetClickHandler} />
  );
};

CabinetSet.propTypes = {
  cabinetSetClickHandler: PropTypes.func.isRequired,
  cabinet_set: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  sel_cabinet_set: PropTypes.object
};

CabinetSet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetSet;
