import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Element } from "react-scroll";
import moment from "moment";
import PayButtons from "components/PayButtons";

const RegistCabinetResult = (props, context) => {
  const { enrollCabinet, extendCabinet, now_datetime } = props;
  return (
    <Element name="RegistCabinetResult">
      {enrollCabinet.sel_cabinet_cost_type ? (
        <EnrollCabinetResult
          start_datetime={enrollCabinet.sel_start_datetime}
          end_datetime={enrollCabinet.sel_end_datetime}
          now_datetime={now_datetime}
          days={enrollCabinet.sel_cabinet_cost_type.days}
          cabinets_to_enroll={enrollCabinet.cabinets_to_enroll}
          target_user={enrollCabinet.target_user}
        />
      ) : (
        ""
      )}
      {extendCabinet.sel_cabinet_costtype ? (
        <ExtendCabinetResult
          cabinets_extend={extendCabinet.cabinets_extend}
          sel_cabinet_costtype={extendCabinet.sel_cabinet_costtype}
        />
      ) : (
        ""
      )}
      <PayButtons />
    </Element>
  );
};

const EnrollCabinetResult = (props, context) => {
  const {
    start_datetime,
    end_datetime,
    now_datetime,
    days,
    cabinets_to_enroll,
    target_user
  } = props;
  return cabinets_to_enroll.map(cabinet_to_enroll => (
    <div className={styles.cabinetResultContainer} key={cabinet_to_enroll.id}>
      <div className={styles.card}>
        <div className={styles.cardLeft}>
          <div className={styles.cardTop}>
            <div className={styles.logoCon}>
              <img
                src={require("images/white_log.png")}
                alt={context.t("로고")}
              />
            </div>
            <div className={styles.titleCon}>블루닷라운지</div>
            <div className={styles.rightTitleCon}>사물함 등록</div>
          </div>
          <div className={styles.cardMiddle}>
            <div className={styles.barcodeCon}>
              <img
                src={require("images/barcode_long.png")}
                alt={context.t("바코드")}
              />
            </div>
            <div className={styles.contentCon}>
              <div className={styles.textCon}>
                <div className={styles.nameCon}>
                  회원 이름 :<br />
                  {target_user.name}
                </div>
                <div className={styles.branchCon}>
                  지점명 :<br />
                  {cabinet_to_enroll.cabinet_set.branch.branch_name}
                </div>
                <div className={styles.datetimeCon}>
                  등록일시 :<br />
                  {now_datetime}
                </div>
              </div>
              <div className={styles.fromtoCon}>
                <div className={styles.fromCon}>
                  <div className={styles.left}>기간 :</div>
                  <div className={styles.right}>
                    {start_datetime} - {end_datetime}
                  </div>
                </div>
              </div>
              <div className={styles.mainTextCon}>
                <div className={styles.timeCon}>
                  등록시간<br /> {days}일
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardBottom} />
        </div>
      </div>
    </div>
  ));
};

const ExtendCabinetResult = (props, context) => {
  const { cabinets_extend, sel_cabinet_costtype } = props;
  return (
    <div className={styles.membershipResultContainer}>
      <div className={styles.title}>블루닷라운지 사물함 연장</div>

      {cabinets_extend.map(cabinet => (
        <Fragment key={cabinet.id}>
          <div className={styles.column}>
            <div className={styles.columnTitle}>연장할 사물함</div>
            <div className={styles.columnContent}>
              {cabinet.cabinet_set.branch.branch_name} {cabinet.cabinet_number}번
              사물함
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>연장전 이용 기간</div>
            <div className={styles.columnContent}>
              {moment(cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")} ~{" "}
              {moment(cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>연장후 이용 기간</div>
            <div className={styles.columnContent}>
              {moment(cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")} ~{" "}
              {moment(cabinet.end_date)
                .add(sel_cabinet_costtype.days * 24, "hours")
                .format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

RegistCabinetResult.propTypes = {};

RegistCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};

EnrollCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};
export default RegistCabinetResult;
