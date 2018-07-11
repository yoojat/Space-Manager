import React from "react";
import PropTypes from "prop-types";
import ExtendCabinetList from "components/ExtendCabinetList";
import styles from "./styles.scss";
import { Element } from "react-scroll";

const CabinetChoiceExtend = (props, context) => {
  const { my_cabinets } = props;
  return (
    <Element name="CabinetChoiceExtend">
      <div className={styles.selectMemExtendContainer}>
        <div className={styles.title}>연장하실 사물함을 선택해주세요.</div>
      </div>
      {my_cabinets.map(my_cabinet => (
        <ExtendCabinetList key={my_cabinet.id} my_cabinet={my_cabinet} />
      ))}
    </Element>
  );
};

CabinetChoiceExtend.propTypes = {};

CabinetChoiceExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetChoiceExtend;
