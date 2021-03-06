import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";

import { Element } from "react-scroll";

const SelectDaysCabinet = (props, context) => {
  if (props.loading) {
    return null;
  } else {
    return (
      <RenderSelectDays
        cabinet_cost_types={props.cabinet_cost_types}
        onDaysClick={props.onDaysClick}
        cost_type={props.cost_type}
        start_date={props.start_date}
        start_time={props.start_time}
        selected_button={props.selected_button}
      />
    );
  }
};

const RenderSelectDays = (props, context) => {
  const {
    cabinet_cost_types,
    onDaysClick,
    cost_type,
    start_date,
    start_time,
    selected_button
  } = props;
  let end = null;
  const start_datetime = start_date.concat(" ", start_time);
  if (cost_type) {
    end = moment(start_datetime).add(Number(cost_type.days) * 24, "hour");
  } else {
    end = moment();
  }

  const show_end_datetime = end.format("YYYY-MM-DD HH:mm:ss");

  return (
    <Fragment>
      <Element name="select_costype" />

      <div className={styles.message}>이용일수를 선택해주세요</div>
      <div className={styles.container}>
        {cabinet_cost_types.map(cost_type => {
          const end_datetime = moment(start_datetime)
            .add(Number(cost_type.days) * 24, "hour")
            .format("YYYY-MM-DD HH:mm:ss");

          return (
            <DaysButton
              cost_type={cost_type}
              onDaysClick={onDaysClick}
              id={cost_type.id}
              key={cost_type.id}
              isSelected={cost_type.id === selected_button}
              end_datetime={end_datetime}
            />
          );
        })}
      </div>

      {cost_type ? (
        <div className={styles.showPeriod}>
          {" "}
          <span className={styles.blue}>{cost_type.title}</span> 등록시,{" "}
          <span className={styles.blue}>{show_end_datetime}</span>까지 이용 가능
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

const DaysButton = (props, context) => {
  const { cost_type, isSelected, end_datetime } = props;
  const classes = `${styles.button} ${isSelected ? styles.selected : ""}`;

  const onDaysClick = () => {
    props.onDaysClick(cost_type, end_datetime);
  };

  return (
    <Fragment>
      <Element />
      <div className={classes} onClick={onDaysClick}>
        <div className={styles.title}>{cost_type.title} 등록</div>
        <div className={styles.money}>{numberWithCommas(cost_type.cost)}원</div>
      </div>
    </Fragment>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

SelectDaysCabinet.propTypes = {
  start_time: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  setSelCostType: PropTypes.func.isRequired,
  selected_button: PropTypes.number,
  onDaysClick: PropTypes.func.isRequired,
  membership_cost_types: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.number.isRequired,
      cost_type: PropTypes.string.isRequired,
      days: PropTypes.number.isRequired,
      enroll_type: PropTypes.shape({
        en_substance: PropTypes.string.isRequired,
        kr_substance: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  loading: PropTypes.bool.isRequired,
  getMembershipCostTypes: PropTypes.func.isRequired,
  setSelEndDateTime: PropTypes.func.isRequired
};
SelectDaysCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SelectDaysCabinet;
