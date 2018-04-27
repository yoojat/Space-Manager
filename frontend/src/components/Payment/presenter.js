import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {Element} from 'react-scroll';

const Payment = props => {
  const {
    branch_name,
    start_date,
    start_time,
    end_datetime,
    cost,
    all_info_setup,
    onPayClick,
  } = props;
  return (
    <Fragment>
      <Element name="payment" className={styles.paymentContainer}>
        <div className={styles.title}>블루닷라운지 멤버쉽</div>

        {all_info_setup ? (
          <div>
            <div className={styles.payment}>
              <div className={styles.paymentMembership}>멤버쉽</div>
              <div className={styles.paymentContent}>
                <div className={styles.branchName}>{branch_name}</div>
                <div className={styles.period}>
                  {start_date} {start_time} ~ {end_datetime}
                </div>
                <div className={styles.cost}>{numberWithCommas(cost)}원</div>
              </div>
            </div>
            <div className={styles.payButton} onClick={onPayClick}>
              결제
            </div>
          </div>
        ) : (
          ''
        )}
      </Element>
    </Fragment>
  );
};
//이름, 등록지점, 시작시각, 만료시각, cost_type(가격, 일수, title)

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default Payment;

Payment.propTypes = {};
Payment.contextTypes = {
  t: PropTypes.func.isRequired,
};
