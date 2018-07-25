import React from "react";
import PropTypes from "prop-types";
import SuperEnrollExtendChoice from "components/SuperEnrollExtendChoice";

const SuperMembership = (props, context) => {
  const { now_view_user_memberships } = props;
  return now_view_user_memberships.length ? (
    <SuperEnrollExtendChoice />
  ) : (
    "바로 등록화면으로"
  );
};

SuperMembership.propTypes = {};

SuperMembership.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperMembership;
