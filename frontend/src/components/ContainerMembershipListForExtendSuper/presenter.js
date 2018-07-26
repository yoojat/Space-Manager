import React from "react";
import PropTypes from "prop-types";
import MembershipListForExtend from "components/MembershipListForExtend";

const ContainerMembershipListForExtendSuper = (props, context) => {
  const { now_view_member_memberships } = props;

  return now_view_member_memberships.map(membership => (
    <MembershipListForExtend membership={membership} key={membership.id} />
  ));
};

ContainerMembershipListForExtendSuper.propTypes = {};

ContainerMembershipListForExtendSuper.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ContainerMembershipListForExtendSuper;
