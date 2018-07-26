import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetChoiceExtendSuper from "components/CabinetChoiceExtendSuper";
import CabinetPeriodChoiceExtendSuper from "components/CabinetPeriodChoiceExtendSuper";

const SuperExtendCabinet = (props, context) => {
  const {
    is_first,
    is_extend_cabinet,
    onYesClick,
    onNoClick,
    cabinets_extend
  } = props;
  return (
    <div className={styles.selectMemExtendContainer}>
      <div className={styles.title}>
        현재 이용하고 있는 사물함이 있습니다.<br />기존 사물함을
        연장하시겠습니까?
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={
            is_first
              ? `${styles.button}`
              : is_extend_cabinet
                ? `${styles.button} ${styles.selected}`
                : `${styles.button}`
          }
          onClick={onYesClick}
        >
          예<br />연장하겠습니다
        </div>
        <div
          className={
            is_first
              ? `${styles.button}`
              : is_extend_cabinet
                ? `${styles.button}`
                : `${styles.button} ${styles.selected}`
          }
          onClick={onNoClick}
        >
          아니오<br /> 연장하지 않겠습니다
        </div>
      </div>
      {is_extend_cabinet ? <CabinetChoiceExtendSuper /> : ""}
      {cabinets_extend.length ? <CabinetPeriodChoiceExtendSuper /> : ""}
    </div>
  );
};

SuperExtendCabinet.propTypes = {};

SuperExtendCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperExtendCabinet;
