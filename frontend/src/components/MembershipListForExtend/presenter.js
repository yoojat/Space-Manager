import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const MembershipListForExtend = (props, context) => {
  const { membership, membership_to_extended, onClickMembership } = props;

  return (
    <div
      className={`${styles.listContainer} ${
        membership_to_extended
          ? membership_to_extended.id === membership.id
            ? styles.selected
            : ""
          : ""
      }`}
      onClick={onClickMembership}
    >
      <div className={styles.branch}>{membership.branch.branch_name}</div>

      <div className={styles.period}>
        {membership.start_date} - {membership.end_date}
      </div>
    </div>
  );
};

MembershipListForExtend.propTypes = {};

MembershipListForExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MembershipListForExtend;
