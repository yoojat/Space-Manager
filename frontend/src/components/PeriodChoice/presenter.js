import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PeriodChoice = (props, context) => {
  const {
    membership_cost_types,
    onPeriodClick,
    sel_cost_type,
    end_datetime
  } = props;
  return (
    <Fragment>
      <div className={styles.message}>이용일수를 선택해주세요</div>
      <div className={styles.container}>
        {membership_cost_types.map(cost_type => {
          return (
            <DaysButton
              sel_cost_type={sel_cost_type}
              cost_type={cost_type}
              onPeriodClick={onPeriodClick}
              id={cost_type.id}
              key={cost_type.id}
            />
          );
        })}
      </div>

      {sel_cost_type ? (
        <div className={styles.showPeriod}>
          {" "}
          <span className={styles.blue}>
            {sel_cost_type.title}
          </span> 등록시, <span className={styles.blue}>{end_datetime}</span>까지
          이용 가능
        </div>
      ) : (
        ""
      )}
    </Fragment>
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

PeriodChoice.propTypes = {
  membership_cost_types: PropTypes.array.isRequired,
  onPeriodClick: PropTypes.func.isRequired,
  sel_cost_type: PropTypes.object
};

PeriodChoice.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PeriodChoice;
