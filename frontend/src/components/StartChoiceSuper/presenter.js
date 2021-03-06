import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Datetime from "react-datetime";
import datetime_styles from "react-datetime/css/react-datetime.css";
import PeriodChoice from "components/PeriodChoice";
import Loading from "components/Loading";

const StartChocieSuper = (props, context) => {
  var moment = require("moment");
  require("moment/locale/ko");

  const { onStartDatetimeChange, membership_cost_types } = props;

  return (
    <div name="startChoice">
      <div className={styles.selWhenTitle}>
        {context.t("이용시작 일시를 선택해 주세요!")}
      </div>
      <Datetime
        className={`${datetime_styles.rdt} ${styles.datetime}`}
        defaultValue={moment()}
        dateFormat="YYYY MMMM Do"
        timeFormat="A hh:mm"
        onChange={onStartDatetimeChange}
      />
      {membership_cost_types ? <PeriodChoice /> : <Loading />}
    </div>
  );
};
StartChocieSuper.propTypes = {
  onStartDatetimeChange: PropTypes.func.isRequired,
  membership_cost_types: PropTypes.array,
  start_datetime: PropTypes.string
};

StartChocieSuper.contextTypes = {
  t: PropTypes.func.isRequired
};

export default StartChocieSuper;
