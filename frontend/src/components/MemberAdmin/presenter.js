import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import MembershipsByDate from "components/MembershipsByDate";
import Loading from "components/Loading";
import SearchMember from "components/SearchMember";
import MemberDetail from "components/MemberDetail";

const MemberAdmin = (props, context) => {
  const { loading, show_detail_view } = props;
  return (
    <div className={styles.memberAdminCon}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <MembershipsByDate />
          <SearchMember />
          {show_detail_view ? <MemberDetail /> : ""}
        </div>
      )}
    </div>
  );
};

MemberAdmin.propTypes = {};

MemberAdmin.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MemberAdmin;
