import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Element } from "react-scroll";
import moment from "moment";
import PayButtons from "components/PayButtons";

const EnrollMembershipResult = (props, context) => {
  const {
    enrollMembership,
    enrollCabinet,
    extendCabinet,
    now_datetime
  } = props;
  return (
    <Element name="EnrollMembershipResult">
      {enrollMembership.sel_cost_type ? (
        <MembershipResult
          user_id={enrollMembership.target_user.username}
          user_name={enrollMembership.target_user.name}
          branch_name={enrollMembership.sel_branch.branch_name}
          start_datetime={enrollMembership.start_datetime}
          end_datetime={enrollMembership.end_datetime}
          days={enrollMembership.sel_cost_type.days}
          now_datetime={now_datetime}
          title={enrollMembership.sel_cost_type.title}
        />
      ) : (
        ""
      )}

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
          now_datetime={now_datetime}
        />
      ) : (
        ""
      )}
      <PayButtons />
    </Element>
  );
};

const MembershipResult = (props, context) => {
  const {
    title,
    user_name,
    branch_name,
    start_datetime,
    end_datetime,
    now_datetime
  } = props;
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
            <div className={styles.rightTitleCon}>멤버쉽 등록</div>
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
                  {user_name}
                </div>
                <div className={styles.branchCon}>
                  지점명 :<br />
                  {branch_name}
                </div>
                <div className={styles.datetimeCon}>
                  등록일시 :<br />
                  {now_datetime}
                </div>
              </div>
              <div className={styles.fromtoCon}>
                <div className={styles.fromCon}>
                  <div className={styles.right}>
                    {start_datetime} - {end_datetime}
                  </div>
                </div>
              </div>
              <div className={styles.mainTextCon}>
                <div className={styles.timeCon}>
                  연장시간<br /> {title}
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

  // <div className={styles.membershipResultContainer}>
  //   <div className={styles.title}>블루닷라운지 사물함</div>

  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>등록 지점</div>
  //     <div className={styles.columnContent}>{branch_name}</div>
  //   </div>
  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>이용 시작</div>
  //     <div className={styles.columnContent}>{start_datetime}</div>
  //   </div>

  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>이용 종료</div>
  //     <div className={styles.columnContent}>{end_datetime}</div>
  //   </div>

  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>사물함 번호</div>
  //     <div className={styles.columnContent}>
  //       {cabinets_to_enroll.map(cabinet => (
  //         <span className={styles.cabinetNumber} key={cabinet.id}>
  //           {cabinet.cabinet_number}
  //         </span>
  //       ))}
  //     </div>
  //   </div>

  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>이용 종료</div>
  //     <div className={styles.columnContent}>{end_datetime}</div>
  //   </div>
  //   <div className={styles.column}>
  //     <div className={styles.columnTitle}>총 이용일수</div>
  //     <div className={styles.columnContent}>
  //       {days === 0.5 ? "12시간" : `${days}일`}
  //     </div>
  //   </div>
  // </div>
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

EnrollMembershipResult.propTypes = {};

ExtendCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};

EnrollMembershipResult.contextTypes = {
  t: PropTypes.func.isRequired
};

MembershipResult.contextTypes = {
  t: PropTypes.func.isRequired
};

EnrollCabinetResult.contextTypes = {
  t: PropTypes.func.isRequired
};
export default EnrollMembershipResult;
