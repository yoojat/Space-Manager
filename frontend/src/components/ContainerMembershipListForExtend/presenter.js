import React from "react";
import PropTypes from "prop-types";
import MembershipListForExtend from "components/MembershipListForExtend";

const ContainerMembershipListForExtend = (props, context) => {
  const { my_memberships } = props;

  return my_memberships.map(my_membership => (
    <MembershipListForExtend
      membership={my_membership}
      key={my_membership.id}
    />
  ));
};

ContainerMembershipListForExtend.propTypes = {};

ContainerMembershipListForExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ContainerMembershipListForExtend;
