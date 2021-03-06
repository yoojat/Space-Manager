import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

const EnrollExtendChoice = (props, context) => {
  return (
    <div className={styles.backWhite}>
      <div className={styles.title}>
        현재 이용중인 멤버쉽이 있습니다. 버튼을 눌러 진행해주세요!
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/enroll">
          <div className={styles.button}>멤버쉽 추가 등록</div>
        </Link>
        <Link to="/extend">
          <div className={styles.button}>현재 멤버쉽 연장</div>
        </Link>
      </div>
    </div>
  );
};

EnrollExtendChoice.propTypes = {};

EnrollExtendChoice.contextTypes = {
  t: PropTypes.func.isRequired
};

export default EnrollExtendChoice;
