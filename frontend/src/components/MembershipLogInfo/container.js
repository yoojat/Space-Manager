import React, { Component } from "react";
import MembershipLogInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_user_membership_logs } = this.props;
    return (
      <MembershipLogInfo
        now_view_user_membership_logs={now_view_user_membership_logs}
      />
    );
  }
}
export default Container;
