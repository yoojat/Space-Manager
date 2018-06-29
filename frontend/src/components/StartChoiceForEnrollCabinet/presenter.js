import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Datetime from "react-datetime";
import datetime_styles from "react-datetime/css/react-datetime.css";
import CabinetCostListForEnroll from "components/CabinetCostListForEnroll";
import { Element } from "react-scroll";

const StartChoiceForEnrollCabinet = (props, context) => {
  var moment = require("moment");
  require("moment/locale/ko");

  const {
    onStartDatetimeChange,
    cabinet_cost_types
    // cabinets_to_enroll
  } = props;

  return (
    <Element name="StartChoiceForEnrollCabinet">
      <div className={styles.selWhenTitle}>
        {context.t("사물함 이용시작 일시를 선택해 주세요!")}
      </div>
      <Datetime
        className={`${datetime_styles.rdt} ${styles.datetime}`}
        defaultValue={moment()}
        dateFormat="YYYY MMMM Do"
        timeFormat="A hh:mm"
        onChange={onStartDatetimeChange}
      />
      <div className={styles.selWhenTitle}>
        {context.t("사물함 이용일수를 선택해 주세요!")}
      </div>
      <div className={styles.costListContainer}>
        {/* cabine_cost_types가 있다면 가격리스트 보여주기 */}
        {cabinet_cost_types.length
          ? cabinet_cost_types.map(cabinet_cost_type => (
              <CabinetCostListForEnroll
                cabinet_cost_type={cabinet_cost_type}
                key={cabinet_cost_type.id}
              />
            ))
          : ""}
      </div>
    </Element>
  );
};
StartChoiceForEnrollCabinet.propTypes = {
  onStartDatetimeChange: PropTypes.func,
  membership_cost_types: PropTypes.array,
  start_datetime: PropTypes.string
};

StartChoiceForEnrollCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default StartChoiceForEnrollCabinet;
