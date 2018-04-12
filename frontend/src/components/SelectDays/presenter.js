import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import moment from 'moment';

const SelectDays = (props, context) => {
  if (props.loading) {
    return null;
  } else {
    return (
      <RenderSelectDays
        membership_cost_types={props.membership_cost_types}
        onDaysClick={props.onDaysClick}
        cost_type={props.cost_type}
      />
    );
  }
};

const RenderSelectDays = (props, context) => {
  const {membership_cost_types, onDaysClick, cost_type, start_date} = props;
  let end = null;
  if (cost_type) {
    end = moment(start_date)
      .add('hour', Number(cost_type.days) * 24)
      .format('YYYY년 MM월 DD일 h:mm:ss a');
  } else {
    end = moment();
  }
  return (
    <Fragment>
      <div className={styles.message}>이용일수를 선택해주세요</div>
      <div className={styles.container}>
        {membership_cost_types.map(cost_type => (
          <DaysButton cost_type={cost_type} onDaysClick={onDaysClick} />
        ))}
      </div>
      <div>
        {cost_type
          ? `${cost_type.title} 등록시, ${end}까지 사용 가능`
          : '노선택'}
      </div>
    </Fragment>
  );
};

const DaysButton = (props, context) => {
  const {cost_type} = props;
  const onDaysClick = () => {
    props.onDaysClick(cost_type);
  };

  return (
    <div className={styles.button} onClick={onDaysClick}>
      <div className={styles.title}>{cost_type.title} 등록</div>
      <div className={styles.money}>{numberWithCommas(cost_type.cost)}원</div>
      {cost_type.days >= 90 && cost_type.days <= 180 ? (
        <div className={styles.hint}>
          ({numberWithCommas(
            Math.floor(Number(cost_type.cost) / (Number(cost_type.days) / 30))
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
