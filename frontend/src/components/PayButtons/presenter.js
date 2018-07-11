import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PayButtons = (props, context) => {
  const { onPayClick } = props;
  return (
    <div className={styles.buttonContainer}>
      <div>
        <CardPayButton onPayClick={onPayClick} />
      </div>
      <div>
        <PhonePayButton onPayClick={onPayClick} />
      </div>
      <div>
        <VbankPayButton onPayClick={onPayClick} />
      </div>
    </div>
  );
};

const CardPayButton = (props, context) => {
  const { onPayClick } = props;
  const _onPayClick = () => {
    onPayClick("card");
  };
  return <div onClick={_onPayClick}>{context.t("카드 결제")}</div>;
};

const PhonePayButton = (props, context) => {
  const { onPayClick } = props;
  const _onPayClick = () => {
    onPayClick("phone");
  };
  return <div onClick={_onPayClick}>{context.t("소액결제")}</div>;
};

const VbankPayButton = (props, context) => {
  const { onPayClick } = props;
  const _onPayClick = () => {
    onPayClick("vbank");
  };
  return <div onClick={_onPayClick}>{context.t("무통장입금")}</div>;
};

PayButtons.propTypes = {};

PayButtons.contextTypes = {
  t: PropTypes.func.isRequired
};
CardPayButton.contextTypes = {
  t: PropTypes.func.isRequired
};
PhonePayButton.contextTypes = {
  t: PropTypes.func.isRequired
};
VbankPayButton.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PayButtons;
