import React from "react";
import PropTypes from "prop-types";
import ExtendCabinetList from "components/ExtendCabinetList";
import styles from "./styles.scss";

const CabinetChoiceExtendSuper = (props, context) => {
  const { my_cabinets } = props;
  return (
    <div>
      <div className={styles.selectMemExtendContainer}>
        <div className={styles.title}>연장하실 사물함을 선택해주세요.</div>
      </div>
      {my_cabinets.map(my_cabinet => (
        <ExtendCabinetList key={my_cabinet.id} my_cabinet={my_cabinet} />
      ))}
    </div>
  );
};

CabinetChoiceExtendSuper.propTypes = {};

CabinetChoiceExtendSuper.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetChoiceExtendSuper;
