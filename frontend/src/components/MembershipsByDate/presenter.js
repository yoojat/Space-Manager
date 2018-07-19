import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const MembershipsByDate = (props, context) => {
  const {
    memberships_by_date,
    select_date,
    onDateChange,
    onMemberClick
  } = props;

  return (
    <div className={styles.memberBackContainer}>
      <div className={styles.titleTagCon}>
        <div className={styles.titleTag}>
          <DatePicker
            selected={select_date}
            onChange={onDateChange}
            dateFormat="YYYY-MM-DD"
            todayButton={"오늘"}
            withPortal
            className={styles.datepicker}
            locale="fr"
          />{" "}
          <div>멤버쉽 업데이트 회원</div>
        </div>
      </div>
      <div className={`${styles.titleContainer} ${styles.rowContainer}`}>
        <div className={styles.row}>
          <div className={styles.name}>이름</div>
          <div className={styles.userid}>아이디</div>
          <div className={styles.old}>나이</div>
          <div className={styles.regTime}>처리 일시</div>
          <div className={styles.enrollTime}>멤버쉽 시작일시</div>
          <div className={styles.endTime}>멤버쉽 만료일시</div>
        </div>
      </div>
      <div className={`${styles.memberContainer} ${styles.rowContainer}`}>
        {memberships_by_date.map(membership => (
          <MembershipByDateList
            membership={membership}
            onMemberClick={onMemberClick}
            key={membership.id}
          />
        ))}
      </div>
    </div>
  );
};

const MembershipByDateList = (props, context) => {
  const { onMemberClick, membership } = props;
  const clickHandler = () => {
    onMemberClick(membership.user.id);
  };
  return (
    <div
      className={styles.row}
      key={membership.id}
      membership={membership}
      onClick={clickHandler}
    >
      <div className={styles.name}>{membership.user.name}</div>
      <div className={styles.userid}>{membership.user.username}</div>
      <div className={styles.old}>
        {moment().year() - moment(membership.user.birth).year() + 1}
      </div>
      <div className={styles.regTime}>
        {moment(membership.updated_at).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div className={styles.enrollTime}>{membership.start_date}</div>
      <div className={styles.endTime}>{membership.end_date}</div>
    </div>
  );
};

MembershipsByDate.propTypes = {};

MembershipsByDate.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MembershipsByDate;
