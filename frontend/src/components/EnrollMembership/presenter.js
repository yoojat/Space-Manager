import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import { Link } from "react-router-dom";
import BranchChoice from "components/BranchChoice";
import StartChoice from "components/StartChoice";
import ExtendCabinet from "components/ExtendCabinet";
import EnrollCabinet from "components/EnrollCabinet";
import EnrollMembershipResult from "components/EnrollMembershipResult";
import { Element } from "react-scroll";

const EnrollMembership = props => {
  const {
    profile_image,
    username,
    name,
    sel_branch,
    onBranchClick,
    branches,
    sel_cost_type,
    all_info_setup,
    my_memberships,
    is_extend_cabinet,
    my_cabinets,
    onEnrollYesCabinetClick,
    onEnrollNoCabinetClick,
    showEnrollCabinet_is_first,
    is_enroll_cabinet,
    enrollMembershipComplete
  } = props;

  if (props.loading) {
    return <Loading />;
  } else {
    return (
      <RenderEnrollMembership
        profile_image={profile_image}
        username={username}
        name={name}
        sel_branch={sel_branch}
        onBranchClick={onBranchClick}
        branches={branches}
        sel_cost_type={sel_cost_type}
        all_info_setup={all_info_setup}
        my_memberships={my_memberships}
        is_extend_cabinet={is_extend_cabinet}
        my_cabinets={my_cabinets}
        onEnrollYesCabinetClick={onEnrollYesCabinetClick}
        onEnrollNoCabinetClick={onEnrollNoCabinetClick}
        showEnrollCabinet_is_first={showEnrollCabinet_is_first}
        is_enroll_cabinet={is_enroll_cabinet}
        enrollMembershipComplete={enrollMembershipComplete}
      />
    );
  }
};

const RenderEnrollMembership = (props, context) => {
  const {
    profile_image,
    username,
    name,
    sel_branch,
    sel_cost_type,
    my_cabinets,
    onEnrollYesCabinetClick,
    onEnrollNoCabinetClick,
    showEnrollCabinet_is_first,
    is_enroll_cabinet,
    enrollMembershipComplete
  } = props;

  return (
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
        <BranchChoice />
        {sel_branch ? <StartChoice /> : ""}
        {sel_cost_type ? (
          my_cabinets.length ? (
            <ExtendCabinet /> // 이용중인 사물함이 없으면 // 맴버쉽 기간을 정했고 // 이용중인 사물함이 있으면
          ) : (
            <Element
              name="isAddCabinet"
              className={styles.selectMemExtendContainer}
            >
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
                  onClick={onEnrollYesCabinetClick}
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
            </Element>
          )
        ) : (
          ""
        )}
        {enrollMembershipComplete ? <EnrollMembershipResult /> : ""}
      </div>
    </main>
  );
};

export default EnrollMembership;

EnrollMembership.propTypes = {
  branches: PropTypes.array,
  profile_image: PropTypes.string,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sel_branch: PropTypes.object,
  sel_cabinet_set: PropTypes.object,
  sel_cost_type: PropTypes.object
};

EnrollMembership.contextTypes = {
  t: PropTypes.func.isRequired
};
RenderEnrollMembership.contextTypes = {
  t: PropTypes.func.isRequired
};
