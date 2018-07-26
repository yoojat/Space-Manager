import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";
import SuperConfirm from "components/SuperConfirm";

const ExtendMembershipResultSuper = (props, context) => {
  const {
    extendMembership,
    enrollCabinet,
    extendCabinet,
    now_datetime
  } = props;
  return (
    <div className={styles.extendMembershipResult}>
      {extendMembership.sel_cost_type ? (
        <MembershipResult
          membership_extend={extendMembership.membership_extend}
          sel_cost_type={extendMembership.sel_cost_type}
          now_datetime={now_datetime}
        />
      ) : (
        ""
      )}
      {enrollCabinet.sel_cabinet_cost_type ? (
        <EnrollCabinetResult
          target_user={enrollCabinet.target_user}
          start_datetime={enrollCabinet.sel_start_datetime}
          end_datetime={enrollCabinet.sel_end_datetime}
          days={enrollCabinet.sel_cabinet_cost_type.days}
          cabinets_to_enroll={enrollCabinet.cabinets_to_enroll}
          now_datetime={now_datetime}
        />
      ) : (
        ""
      )}
      {extendCabinet.sel_cabinet_costtype ? (
        <ExtendCabinetResult
          cabinets_extend={extendCabinet.cabinets_extend}
          sel_cabinet_costtype={extendCabinet.sel_cabinet_costtype}
          now_datetime={now_datetime}
        />
      ) : (
        ""
      )}
      <SuperConfirm />
    </div>
  );
};

const MembershipResult = (props, context) => {
  const { membership_extend, sel_cost_type, now_datetime } = props;
  return (
    <div className={styles.membershipResultContainer}>
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
            <div className={styles.rightTitleCon}>멤버쉽 연장</div>
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
                  {membership_extend.user.name}
                </div>
                <div className={styles.branchCon}>
                  지점명 :<br />
                  {membership_extend.branch.branch_name}
                </div>
                <div className={styles.datetimeCon}>
                  등록일시 :<br />
                  {now_datetime}
                </div>
              </div>
              <div className={styles.fromtoCon}>
                <div className={styles.fromCon}>
                  <div className={styles.left}>From :</div>
                  <div className={styles.right}>
                    {membership_extend.start_date} -{" "}
                    {membership_extend.end_date}
                  </div>
                </div>
                <div className={styles.toCon}>
                  <div className={styles.left}>To :</div>
                  <div className={styles.right}>
                    {membership_extend.start_date} -{" "}
                    {moment(membership_extend.end_date)
                      .add(Number(sel_cost_type.days) * 24, "h")
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
              </div>
              <div className={styles.mainTextCon}>
                <div className={styles.timeCon}>
                  연장시간<br /> {sel_cost_type.title}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardBottom} />
        </div>
      </div>
    </div>
  );
};

const EnrollCabinetResult = (props, context) => {
  const {
    target_user,
    now_datetime,
    start_datetime,
    end_datetime,
    days,
    cabinets_to_enroll
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
  const { cabinets_extend, sel_cabinet_costtype, now_datetime } = props;
  return cabinets_extend.map(cabinet => (
    <div className={styles.cabinetResultContainer} key={cabinet.id}>
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
            <div className={styles.rightTitleCon}>사물함 연장</div>
          </div>
          <div className={styles.cardMiddle}>
            <div className={styles.barcodeCon}>
              <img
                src={require("images/barcode_long.png")}
                alt={context.t("로고")}
              />
            </div>
            <div className={styles.contentCon}>
              <div className={styles.textCon}>
                <div className={styles.nameCon}>
                  회원 이름 :<br />
                  {cabinet.user.name}
                </div>
                <div className={styles.cabinetCon}>
                  사물함 :<br />
                  {cabinet.cabinet_set.branch.branch_name}{" "}
                  {cabinet.cabinet_number}번
                </div>
                <div className={styles.datetimeCon}>
                  등록일시 :<br />
                  {now_datetime}
                </div>
              </div>
              <div className={styles.fromtoCon}>
                <div className={styles.fromCon}>
                  <div className={styles.left}>From :</div>
                  <div className={styles.right}>
                    {moment(cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")} -{" "}
                    {moment(cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
                <div className={styles.toCon}>
                  <div className={styles.left}>To :</div>
                  <div className={styles.right}>
                    {moment(cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")} -{" "}
                    {moment(cabinet.end_date)
                      .add(sel_cabinet_costtype.days * 24, "h")
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
              </div>
              <div className={styles.mainTextCon}>
                <div className={styles.timeCon}>
                  연장시간<br /> {sel_cabinet_costtype.title}
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

ExtendMembershipResultSuper.propTypes = {};

ExtendMembershipResultSuper.contextTypes = {
  t: PropTypes.func.isRequired
};
ExtendCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};

MembershipResult.contextTypes = {
  t: PropTypes.func.isRequired
};
EnrollCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendMembershipResultSuper;
