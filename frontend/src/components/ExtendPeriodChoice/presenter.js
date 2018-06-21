import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";
import Loading from "components/Loading";

const ExtendPeriodChoice = (props, context) => {
  const {
    membership_extend,
    membership_cost_types,
    sel_cost_type,
    onPeriodClick
  } = props;

  return membership_cost_types ? (
    <Fragment>
      <div className={styles.message}>연장 일수를 선택해주세요</div>
      <div className={styles.container}>
        {membership_cost_types.map(cost_type => {
          return (
            <DaysButton
              membership_extend={membership_extend}
              cost_type={cost_type}
              onPeriodClick={onPeriodClick}
              id={cost_type.id}
              key={cost_type.id}
              sel_cost_type={sel_cost_type}
            />
          );
        })}
      </div>

      {sel_cost_type ? (
        <div className={styles.showPeriod}>
          <span className={styles.blue}>{sel_cost_type.title}</span> 등록시,{" "}
          <span className={styles.blue}>
            {moment(membership_extend.end_date, "YYYY-MM-DD HH:mm:ss")
              .add(Number(sel_cost_type.days) * 24, "hour")
              .format("YYYY-MM-DD HH:mm:ss")}
          </span>까지 이용 가능
        </div>
      ) : (
        ""
      )}
    </Fragment>
  ) : (
    <Loading />
  );
};

class DaysButton extends Component {
  _onButtonClick = () => {
    const { onPeriodClick, id } = this.props;
    onPeriodClick(id);
  };

  render() {
    const { cost_type, sel_cost_type, id } = this.props;
    const classes = `${styles.button} ${
      sel_cost_type && sel_cost_type.id === id ? styles.selected : ""
    }`;
    return (
      <Fragment>
        <div className={classes} onClick={this._onButtonClick}>
          <div className={styles.title}>{cost_type.title} 등록</div>
          <div className={styles.money}>
            {numberWithCommas(cost_type.cost)}원
          </div>
        </div>
      </Fragment>
    );
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

ExtendPeriodChoice.propTypes = {};

ExtendPeriodChoice.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendPeriodChoice;
