import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {Element} from 'react-scroll';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Payment = props => {
  const {
    branch_name,
    start_date,
    start_time,
    end_datetime,
    cost_type,
    all_info_setup,
    onPayClick,
    sel_cabinets,
  } = props;

  const options = [
    '결제수단을 선택해주세요.',
    '카드결제',
    '무통장입금(가상계좌)',
    '휴대폰 소액결제',
  ];
  const defaultOption = options[0];

  console.log(cost_type);
  return (
    <Fragment>
      <Element name="payment" className={styles.paymentContainer}>
        <div className={styles.title}>결제정보 확인</div>

        {all_info_setup ? (
          <div>
            <div className={styles.payment}>
              <div className={styles.paymentMembership} />
              <div className={styles.paymentContent}>
                <div className={styles.branchName}>
                  <div className={styles.title}>{branch_name}</div>
                </div>
                <div className={styles.period}>
                  <div>
                    이용시작시간 : {start_date} {start_time}
                  </div>
                  <div>이용만료시각 : {end_datetime}</div>
                  <div>이용요금 : {numberWithCommas(cost_type.cost)}원</div>
                </div>
              </div>
              {sel_cabinets.map(cabinet => (
                <div className={styles.paymentContent} key={cabinet.id}>
                  <div className={styles.branchName}>
                    <div className={styles.title}>{branch_name}</div>
                  </div>
                  <div className={styles.period}>
                    <div>사물함번호: {cabinet.cabinet_number}</div>
                    <div>
                      이용시작시간 : {start_date} {start_time}
                    </div>
                    <div>이용만료시각 : {end_datetime}</div>
                    <div>
                      이용요금 :{' '}
                      {numberWithCommas(cost_type.cabinet_cost_type.cost)}원
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Dropdown
                options={options}
                onChange={this._onSelect}
                value={defaultOption}
                placeholder="Select an option"
              />
              {/* <div className={styles.payButton} onClick={onPayClick}>
                카드 결제
              </div>
              <div className={styles.payButton} onClick={onPayClick}>
                무통장 입금(가상계좌))
              </div>
              <div className={styles.payButton} onClick={onPayClick}>
                휴대폰 소액결제
              </div>
              <div className={styles.payButton} onClick={onPayClick}>
                실시간 계좌이체
              </div> */}
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
