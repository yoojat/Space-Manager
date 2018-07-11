import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import CabinetCostList from "components/CabinetCostList";
import { Element } from "react-scroll";

const CabinetPeriodChoiceExtend = (props, context) => {
  const { extend_cabinet_cost_types, loading } = props;
  return loading ? (
    <Loading />
  ) : (
    <Element name="CabinetPeriodChoiceExtend">
      <div className={styles.title}>사물함의 연장기간을 선택해주세요</div>
      <div className={styles.costListContainer}>
        {extend_cabinet_cost_types.map(cabinet_cost_type => (
          <CabinetCostList
            cabinet_cost_type={cabinet_cost_type}
            key={cabinet_cost_type.id}
          />
        ))}
      </div>
    </Element>
  );
};

CabinetPeriodChoiceExtend.propTypes = {};

CabinetPeriodChoiceExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetPeriodChoiceExtend;
