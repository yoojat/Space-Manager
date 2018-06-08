import React from "react";
import PropTypes from "prop-types";
import MembershipListForExtend from "components/MembershipListForExtend";

const ContainerMembershipListForExtend = (props, context) => {
  const { my_memberships } = props;

  return my_memberships.length
    ? my_memberships.map(my_membership => (
        <MembershipListForExtend
          membership={my_membership}
          key={my_membership.id}
        />
      ))
    : "현재 이용중인 맴버쉽이 없습니다";
};

ContainerMembershipListForExtend.propTypes = {};

ContainerMembershipListForExtend.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ContainerMembershipListForExtend;
