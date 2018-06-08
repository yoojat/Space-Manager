import React, { Component } from "react";
import MembershipListForExtend from "./presenter";

class Container extends Component {
  state = {};

  _onClickMembership = () => {
    const { membership, setMembershipsToExtended } = this.props;
    setMembershipsToExtended(membership);
  };
  render() {
    const { membership, membership_to_extended } = this.props;
    return (
      <MembershipListForExtend
        membership={membership}
        membership_to_extended={membership_to_extended}
        onClickMembership={this._onClickMembership}
      />
    );
  }
}
export default Container;
