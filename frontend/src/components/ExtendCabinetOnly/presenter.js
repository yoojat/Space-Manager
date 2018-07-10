import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import CabinetChoiceExtend from "components/CabinetChoiceExtend";
import CabinetPeriodChoiceExtend from "components/CabinetPeriodChoiceExtend";
import RegistCabinetResult from "components/RegistCabinetResult";
import { Link, Redirect } from "react-router-dom";

const ExtendCabinetOnly = (props, context) => {
  const {
    is_first,
    is_extend_cabinet,
    onYesClick,
    onNoClick,
    cabinets_extend,
    sel_cabinet_costtype,
    user
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
        <div className={styles.selectMemExtendContainer}>
          <div className={styles.title}>
            현재 이용하고 있는 사물함이 있습니다.<br />기존 사물함을
            연장하시겠습니까?
          </div>
          <div className={styles.buttonContainer}>
            <div
              className={
                is_first
                  ? `${styles.button}`
                  : is_extend_cabinet
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
                  : is_extend_cabinet
                    ? `${styles.button}`
                    : `${styles.button} ${styles.selected}`
              }
              onClick={onNoClick}
            >
              아니오<br /> 연장하지 않겠습니다
            </div>
          </div>
          {is_extend_cabinet ? (
            <CabinetChoiceExtend />
          ) : is_first ? (
            ""
          ) : (
            <Redirect to="/enrollcabinet" />
          )}
          {cabinets_extend.length ? <CabinetPeriodChoiceExtend /> : ""}
          {sel_cabinet_costtype ? <RegistCabinetResult /> : ""}
        </div>
      </div>
    </main>
  );
};

ExtendCabinetOnly.propTypes = {};

ExtendCabinetOnly.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExtendCabinetOnly;
