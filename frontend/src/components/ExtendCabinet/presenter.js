import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetChoiceExtend from "components/CabinetChoiceExtend";
import CabinetPeriodChoiceExtend from "components/CabinetPeriodChoiceExtend";

const ExtendCabinet = (props, context) => {
  const {
    is_first,
    will_extend_cabinet,
    onYesClick,
    onNoClick,
    cabinets_to_extended
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
              : will_extend_cabinet
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
              : will_extend_cabinet
                ? `${styles.button}`
                : `${styles.button} ${styles.selected}`
          }
          onClick={onNoClick}
        >
          아니오<br /> 연장하지 않겠습니다
        </div>
      </div>
      {will_extend_cabinet ? <CabinetChoiceExtend /> : ""}
      {cabinets_to_extended.length ? <CabinetPeriodChoiceExtend /> : ""}
    </div>
  );
};

ExtendCabinet.propTypes = {};

ExtendCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendCabinet;
