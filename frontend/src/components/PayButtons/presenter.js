import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PayButtons = (props, context) => {
  const { onPayClick } = props;
  return (
    <div className={styles.buttonContainer}>
      <div onClick={onPayClick}>{context.t("결제 버튼")}</div>
    </div>
  );
};

PayButtons.propTypes = {};

PayButtons.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PayButtons;
