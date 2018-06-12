import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CabinetCostList = (props, context) => {
  const {
    cabinet_cost_type,
    sel_cabinet_cost_type,
    onCabinetCostListClick
  } = props;
  const classes = `${styles.button} ${
    sel_cabinet_cost_type && sel_cabinet_cost_type.id === cabinet_cost_type.id
      ? styles.selected
      : ""
  }`;
  return (
    <div className={classes} onClick={onCabinetCostListClick}>
      <div className={styles.title}>{cabinet_cost_type.title} 등록</div>
      <div className={styles.money}>
        {numberWithCommas(cabinet_cost_type.cost)}원
      </div>
    </div>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

CabinetCostList.propTypes = {};

CabinetCostList.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetCostList;
