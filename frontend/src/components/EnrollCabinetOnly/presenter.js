import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import EnrollCabinet from "components/EnrollCabinet";
import BranchChoiceForCabinet from "components/BranchChoiceForCabinet";
import RegistCabinetResult from "components/RegistCabinetResult";
import { Link } from "react-router-dom";

const EnrollCabinetOnly = (props, context) => {
  const {
    sel_branch,
    loading,
    user,
    cabinet_list_is_first,
    sel_cabinet_cost_type
  } = props;
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
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
            {user.profile_image ? (
              <img
                src={`${user.profile_image}`}
                className={styles.profileImg}
                alt={context.t("profile")}
              />
            ) : (
              ""
            )}

            <div className={styles.name}>
              <span className={styles.username}>{user.username}</span> /{" "}
              <span className={styles.userid}>
                {user.name}
                {context.t("님")}
              </span>
            </div>
          </div>
          <BranchChoiceForCabinet />
          {sel_branch ? (
            <EnrollCabinet />
          ) : cabinet_list_is_first ? (
            ""
          ) : (
            <div className={styles.loadingContainer}>
              <Loading />
            </div>
          )}
          {sel_cabinet_cost_type ? <RegistCabinetResult /> : ""}
        </div>
      </main>
    </Fragment>
  );
};

EnrollCabinetOnly.propTypes = {};

EnrollCabinetOnly.contextTypes = {
  t: PropTypes.func.isRequired
};

export default EnrollCabinetOnly;
