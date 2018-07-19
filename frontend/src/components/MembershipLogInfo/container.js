import React, { Component } from "react";
import MembershipLogInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_member_memberships } = this.props;
    return (
      <MembershipLogInfo
        now_view_member_memberships={now_view_member_memberships}
      />
    );
  }
}
export default Container;
