import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import ExtendPeriodChoice from "components/ExtendPeriodChoice";
import ContainerMembershipListForExtend from "components/ContainerMembershipListForExtend";
import ExtendCabinet from "components/ExtendCabinet";
import ExtendTotalCost from "components/ExtendTotalCost";

const ExtendMembership = (props, context) => {
  const {
    profile_image,
    username,
    name,
    my_memberships,
    loading,
    membership_to_extended,
    sel_cost_type,
    my_cabinets,
    all_info_setup
  } = props;

  return loading ? (
    ""
  ) : (
    <main className={styles.container}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={context.t("Logo")}
          />
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.profile}>
          {profile_image ? (
            <img
              src={`${profile_image}`}
              className={styles.profileImg}
              alt={context.t("profile")}
            />
          ) : (
            ""
          )}

          <div className={styles.name}>
            <span className={styles.username}>{username}</span> /{" "}
            <span className={styles.userid}>
              {name}
              {context.t("님")}
            </span>
          </div>
        </div>
        <div className={styles.membershipContainer}>
          <div className={styles.membershipTitle}>
            연장하실 맴버쉽을 선택해주세요!
          </div>
          {my_memberships.length ? (
            <ContainerMembershipListForExtend />
          ) : (
            "현재 이용중인 맴버쉽이 없습니다"
          )}
        </div>
        {membership_to_extended ? <ExtendPeriodChoice /> : ""}
        {sel_cost_type ? my_cabinets.length ? <ExtendCabinet /> : "" : ""}
        {all_info_setup ? <ExtendTotalCost /> : ""}
      </div>
    </main>
  );
};

ExtendMembership.propTypes = {};

ExtendMembership.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendMembership;
