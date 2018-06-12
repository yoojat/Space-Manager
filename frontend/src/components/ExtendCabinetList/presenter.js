import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";

const ExtendCabinetList = (props, context) => {
  const { my_cabinet, onCabinetClick, cabinets_to_extended } = props;

  const listContainerClasses = cabinets_to_extended.find(function(
    cabinet_to_extended
  ) {
    return cabinet_to_extended.id === my_cabinet.id;
  })
    ? `${styles.listContainer} ${styles.select}`
    : `${styles.listContainer}`;

  return (
    <div className={listContainerClasses} onClick={onCabinetClick}>
      <div className={styles.branch}>
        {my_cabinet.cabinet_set.branch.branch_name} {my_cabinet.cabinet_number}번
        사물함
      </div>
      <div className={styles.period}>
        {moment(my_cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")} -{" "}
        {moment(my_cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </div>
  );
};

ExtendCabinetList.propTypes = {};

ExtendCabinetList.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendCabinetList;
