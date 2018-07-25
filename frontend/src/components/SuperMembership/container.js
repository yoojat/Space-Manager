import React, { Component } from "react";
import SuperMembership from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_member_memberships } = this.props;

    return (
      <SuperMembership
        now_view_user_memberships={now_view_member_memberships}
      />
    );
  }
}
export default Container;
