import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const SelectDays = (props, context) => {
  if (props.loading) {
    return null;
  } else {
    return (
      <RenderSelectDays
        membership_cost_types={props.membership_cost_types}
        onDaysClick={props.onDaysClick}
      />
    );
  }
};

const RenderSelectDays = (props, context) => {
  const {membership_cost_types} = props;
  const {onDaysClick} = props;
  return (
    <Fragment>
      <div className={styles.message}>이용일수를 선택해주세요</div>
      <div className={styles.container}>
        {membership_cost_types.map(cost_type => (
          <DaysButton
            days={cost_type.days}
            id={cost_type.id}
            cost={cost_type.cost}
            key={cost_type.id}
            title={cost_type.title}
            onDaysClick={onDaysClick}
          />
        ))}
      </div>
    </Fragment>
  );
};

const DaysButton = (props, context) => {
  const onDaysClick = () => {
    props.onDaysClick(props.id);
  };

  return (
    <div className={styles.button} onClick={onDaysClick}>
      <div className={styles.title}>{props.title} 등록</div>
      <div className={styles.money}>{numberWithCommas(props.cost)}원</div>
      {props.days >= 90 && props.days <= 180 ? (
        <div className={styles.hint}>
          ({numberWithCommas(
            Math.floor(Number(props.cost) / (Number(props.days) / 30))
          )}원/30일)
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

SelectDays.propTypes = {};
SelectDays.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SelectDays;
