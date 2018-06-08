import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const MyMembershipsChocie = (props, context) => {
  const { is_extend_membership, onYesClick, onNoClick, is_first } = props;
  return (
    <div className={styles.selectMemExtendContainer}>
      <div className={styles.title}>
        현재 이용하고 있는 멤버쉽이 있습니다.<br />기존 멤버쉽을
        연장하시겠습니까?
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={
            is_first
              ? `${styles.button}`
              : is_extend_membership
                ? `${styles.button} ${styles.selected}`
                : `${styles.button}`
          }
          onClick={onYesClick}
        >
          예<br />연장하겠습니다
        </div>
        <div
          className={
            is_first
              ? `${styles.button}`
              : is_extend_membership
                ? `${styles.button}`
                : `${styles.button} ${styles.selected}`
          }
          onClick={onNoClick}
        >
          아니오<br />새로 등록하겠습니다
        </div>
      </div>
    </div>
  );
};

MyMembershipsChocie.propTypes = {};

MyMembershipsChocie.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MyMembershipsChocie;
