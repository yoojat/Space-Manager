import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {Element} from 'react-scroll';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Faltu from 'faltu';

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
    onPayMethodSelect,
    paymethod,
  } = props;

  const options = [
    {value: null, label: '결제수단을 선택해주세요'},
    {value: 'card', label: '카드결제'},
    {value: 'trans', label: '실시간 계좌이체'},
    {value: 'vbank', label: '무통장입금(가상계좌)'},
    {value: 'phone', label: '휴대폰 소액결제', className: 'myOptionClassName'},
  ];

  // const options = [
  //   '결제수단을 선택해주세요.',
  //   '카드결제',
  //   '무통장입금(가상계좌)',
  //   '휴대폰 소액결제',
  // ];
  // const defaultOption = options[0];
  const defaultOption = Faltu(options)
    .find({value: paymethod})
    .get()[0];

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

              <div className={`${styles.paymentContent} ${styles.total}`}>
                <div className={styles.period}>
                  <div>
                    총 결제 금액 :{' '}
                    {cost_type.cabinet_cost_type
                      ? numberWithCommas(
                          cost_type.cost +
                            cost_type.cabinet_cost_type.cost *
                              sel_cabinets.length
                        )
                      : numberWithCommas(cost_type.cost)}원
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Dropdown
                options={options}
                onChange={onPayMethodSelect}
                value={defaultOption}
                placeholder="Select an option"
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className={styles.payButtonContainer}>
          {paymethod ? (
            <div className={styles.payButton} onClick={onPayClick}>
              결제
            </div>
          ) : (
            ''
          )}
        </div>
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
