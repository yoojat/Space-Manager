import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import SelExtendPeriod from "components/SelExtendPeriod";
import ContainerMembershipListForExtend from "components/ContainerMembershipListForExtend";

const ExtendMembership = (props, context) => {
  const {
    profile_image,
    username,
    name,
    my_memberships,
    loading,
    membership_to_extended
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
        {membership_to_extended ? <SelExtendPeriod /> : ""}
      </div>
    </main>
  );
};

ExtendMembership.propTypes = {};

ExtendMembership.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendMembership;