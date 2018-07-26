import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import SuperEnrollMembership from "components/SuperEnrollMembership";
import ExtendMembershipSuper from "components/ExtendMembershipSuper";

const SuperEnrollExtendChoice = (props, context) => {
  const { setIsEnrollTrue, is_enroll, setIsExtendTrue, is_extend } = props;
  return is_enroll ? (
    <SuperEnrollMembership />
  ) : is_extend ? (
    <ExtendMembershipSuper />
  ) : (
    <div className={styles.backWhite}>
      <div className={styles.title}>
        해당 회원은 현재 이용중인 멤버쉽이 있습니다. 버튼을 눌러 진행해주세요!
      </div>
      <div className={styles.buttonContainer}>
        <div>
          <div className={styles.button} onClick={setIsEnrollTrue}>
            멤버쉽 추가 등록
          </div>
        </div>
        <div>
          <div className={styles.button} onClick={setIsExtendTrue}>
            현재 멤버쉽 연장
          </div>
        </div>
      </div>
    </div>
  );
};

SuperEnrollExtendChoice.propTypes = {};

SuperEnrollExtendChoice.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperEnrollExtendChoice;
