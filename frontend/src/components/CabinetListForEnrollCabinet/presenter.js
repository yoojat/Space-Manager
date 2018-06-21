import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CabinetListForEnrollCabinet = (props, context) => {
  const { cabinet_to_enroll, onCabinetCancelClick } = props;
  return (
    <div className={styles.listContainer}>
      <div className={styles.listBranch}>
        {cabinet_to_enroll.cabinet_set.branch.branch_name}
      </div>
      <div className={styles.listContent}>
        {cabinet_to_enroll.cabinet_number}번 사물함
      </div>
      <div className={styles.cancelButton} onClick={onCabinetCancelClick}>
        선택 취소
      </div>
    </div>
  );
};

CabinetListForEnrollCabinet.propTypes = {};

CabinetListForEnrollCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetListForEnrollCabinet;
