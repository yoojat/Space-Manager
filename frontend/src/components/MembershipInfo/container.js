import React, { Component } from "react";
import MembershipInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_member_memberships } = this.props;
    return (
      <MembershipInfo
        now_view_member_memberships={now_view_member_memberships}
      />
    );
  }
}
export default Container;
