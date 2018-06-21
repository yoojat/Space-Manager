import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import ExtendPeriodChoice from "components/ExtendPeriodChoice";
import ContainerMembershipListForExtend from "components/ContainerMembershipListForExtend";
import ExtendCabinet from "components/ExtendCabinet";
// import ExtendTotalCost from "components/ExtendTotalCost";
import EnrollCabinet from "components/EnrollCabinet";

const ExtendMembership = (props, context) => {
  const {
    profile_image,
    username,
    name,
    my_memberships,
    loading,
    membership_extend,
    sel_cost_type,
    my_cabinets,
    is_enroll_cabinet,
    showEnrollCabinet_is_first,
    onEnrollCabinetClick,
    onEnrollNoCabinetClick,
    extendMembershipComplete,
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
        {membership_extend ? <ExtendPeriodChoice /> : ""}
        {sel_cost_type ? (
          my_cabinets.length ? (
            <ExtendCabinet />
          ) : (
            <div className={styles.selectMemExtendContainer}>
              <div className={styles.title}>
                사물함을 추가로 등록하시겠습니까?
              </div>
              <div className={styles.buttonContainer}>
                <div
                  className={
                    showEnrollCabinet_is_first
                      ? `${styles.button}`
                      : is_enroll_cabinet
                        ? `${styles.button} ${styles.selected}`
                        : `${styles.button}`
                  }
                  onClick={onEnrollCabinetClick}
                >
                  예<br />
                </div>
                <div
                  className={
                    showEnrollCabinet_is_first
                      ? `${styles.button}`
                      : is_enroll_cabinet
                        ? `${styles.button}`
                        : `${styles.button} ${styles.selected}`
                  }
                  onClick={onEnrollNoCabinetClick}
                >
                  아니오<br />
                </div>
              </div>
              {is_enroll_cabinet ? <EnrollCabinet /> : ""}
            </div>
          )
        ) : (
          ""
        )}
        {extendMembershipComplete ? "가격표시" : ""}
      </div>
    </main>
  );
};

ExtendMembership.propTypes = {};

ExtendMembership.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendMembership;
