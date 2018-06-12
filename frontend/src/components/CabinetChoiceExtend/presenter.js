import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ExtendCabinetList from "components/ExtendCabinetList";
import styles from "./styles.scss";

const CabinetChoiceExtend = (props, context) => {
  const { my_cabinets } = props;
  return (
    <Fragment>
      <div className={styles.selectMemExtendContainer}>
        <div className={styles.title}>연장하실 사물함을 선택해주세요.</div>
      </div>
      {my_cabinets.map(my_cabinet => (
        <ExtendCabinetList key={my_cabinet.id} my_cabinet={my_cabinet} />
      ))}
    </Fragment>
  );
};

CabinetChoiceExtend.propTypes = {};

CabinetChoiceExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetChoiceExtend;
