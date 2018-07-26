import React from "react";
import PropTypes from "prop-types";
import SuperEnrollExtendChoice from "components/SuperEnrollExtendChoice";
import SuperEnrollMembership from "components/SuperEnrollMembership";

const SuperMembership = (props, context) => {
  const { now_view_user_memberships } = props;
  return now_view_user_memberships.length ? (
    <SuperEnrollExtendChoice />
  ) : (
    <SuperEnrollMembership />
  );
};

SuperMembership.propTypes = {};

SuperMembership.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperMembership;
