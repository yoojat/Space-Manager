import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";
import Dropdown from "react-dropdown";

const ExtendTotalCost = (props, context) => {
  const {
    membership_to_extended,
    sel_cost_type,
    will_extend_cabinet,
    cabinets_to_extended,
    sel_cabinet_cost_type,
    all_info_setup,
    cal_membership_end_datetime,
    membership_cost,
    cabinet_cost
  } = props;

  return (
    <Fragment>
      <div className={styles.paymentContainer}>
        <div className={styles.title}>등록 정보 및 결제정보 확인</div>

        {all_info_setup ? (
          <div>
            <div className={styles.payment}>
              <div className={styles.paymentMembership} />
              <div className={styles.paymentContent}>
                <div className={styles.branchName}>
                  <div className={styles.title}>
                    {membership_to_extended.branch.branch_name}
                  </div>
                </div>
                <div className={styles.period}>
                  <div>이용시작시각 : {membership_to_extended.start_date}</div>
                  <div>이용만료시각 : {cal_membership_end_datetime}</div>
                  <div>이용요금 : {numberWithCommas(sel_cost_type.cost)}원</div>
                </div>
              </div>
              {cabinets_to_extended.map(cabinet_to_extended => (
                <div
                  className={styles.paymentContent}
                  key={cabinet_to_extended.id}
                >
                  <div className={styles.branchName}>
                    <div className={styles.title}>
                      {cabinet_to_extended.cabinet_set.branch.branch_name}
                    </div>
                  </div>
                  <div className={styles.period}>
                    <div>사물함번호: {cabinet_to_extended.cabinet_number}</div>
                    <div>
                      이용시작시각 :{" "}
                      {moment(cabinet_to_extended.start_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </div>
                    <div>
                      이용만료시각 :{" "}
                      {moment(cabinet_to_extended.end_datetime)
                        .add(Number(sel_cabinet_cost_type.days) * 24, "hour")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <div>
                      이용요금 : {numberWithCommas(sel_cabinet_cost_type.cost)}원
                    </div>
                  </div>
                </div>
              ))}

              <div className={`${styles.paymentContent} ${styles.total}`}>
                <div className={styles.period}>
                  <div>
                    총 결제 금액 :{" "}
                    {numberWithCommas(membership_cost + cabinet_cost)}
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              <Dropdown
                options={options}
                onChange={onPayMethodSelect}
                value={defaultOption}
                placeholder="Select an option"
              />
            </div> */}
          </div>
        ) : (
          ""
        )}
        {/* <div className={styles.payButtonContainer}>
          {paymethod ? (
            <div className={styles.payButton} onClick={onPayClick}>
              결제
            </div>
          ) : (
            ""
          )}
        </div> */}
      </div>
    </Fragment>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

ExtendTotalCost.propTypes = {};

ExtendTotalCost.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendTotalCost;
