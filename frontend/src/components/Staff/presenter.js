import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import MemberAdmin from "components/MemberAdmin";

const Staff = (props, context) => {
  const { onPageButtonClick, now_page } = props;
  return (
    <div>
      <div className={styles.staffMenuCon}>
        <div className={styles.staffMenus}>
          <div
            data-value="memberAdmin"
            className={styles.staffMenuItem}
            onClick={onPageButtonClick}
          >
            회원관리
          </div>
          <div
            className={styles.staffMenuItem}
            data-value="seatAdmin"
            onClick={onPageButtonClick}
          >
            좌석정리
          </div>
          <div
            className={styles.staffMenuItem}
            data-value="cabinetAdmin"
            onClick={onPageButtonClick}
          >
            사물함 정리
          </div>
          <div
            className={styles.staffMenuItem}
            data-value="cablockAdmin"
            onClick={onPageButtonClick}
          >
            자물쇠 관리
          </div>
        </div>
      </div>
      {now_page === "memberAdmin" ? <MemberAdmin /> : ""}
      {now_page === "seatAdmin" ? "seatAdmin" : ""}
      {now_page === "cabinetAdmin" ? "cabinetAdmin" : ""}
      {now_page === "cablockAdmin" ? "cablockAdmin" : ""}
    </div>
  );
};

Staff.propTypes = {};

Staff.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Staff;
