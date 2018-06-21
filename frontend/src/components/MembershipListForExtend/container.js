import React, { Component } from "react";
import MembershipListForExtend from "./presenter";

class Container extends Component {
  state = {};

  _onClickMembership = () => {
    const { membership, setMembershipExtend } = this.props;
    setMembershipExtend(membership);
  };
  render() {
    const { membership, membership_extend } = this.props;
    return (
      <MembershipListForExtend
        membership={membership}
        membership_extend={membership_extend}
        onClickMembership={this._onClickMembership}
      />
    );
  }
}
export default Container;
