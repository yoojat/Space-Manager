import React, { Component } from "react";
import ContainerMembershipListForExtend from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { my_memberships } = this.props;
    return <ContainerMembershipListForExtend my_memberships={my_memberships} />;
  }
}
export default Container;
