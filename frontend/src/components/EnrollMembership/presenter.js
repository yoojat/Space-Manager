import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

import BranchChoice from "components/BranchChoice";
import StartChoice from "components/StartChoice";
import CabinetSetChoice from "components/CabinetSetChoice";
import CabinetChoice from "components/CabinetChoice";

const EnrollMembership = props => {
  const {
    profile_image,
    username,
    name,
    sel_branch,
    onBranchClick,
    branches,
    sel_cost_type,
    sel_cabinet_set
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
        sel_cabinet_set={sel_cabinet_set}
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
    branches,
    sel_cost_type,
    sel_cabinet_set
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

        {branches ? <BranchChoice /> : ""}
        {sel_branch ? <StartChoice /> : ""}
        {sel_cost_type ? <CabinetSetChoice /> : ""}
        {sel_cabinet_set ? <CabinetChoice /> : ""}
      </div>
    </main>
  );
};

export default EnrollMembership;

EnrollMembership.propTypes = {
  branches: PropTypes.array,
  profile_image: PropTypes.string.isRequired,
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
