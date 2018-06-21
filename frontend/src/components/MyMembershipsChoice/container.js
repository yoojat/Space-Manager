import React, { Component } from "react";
import MyMembershipsChocie from "./presenter";

class Container extends Component {
  state = {
    is_first: true
  };

  _onYesClick = () => {
    const { setExtendMembership, setExtendMembershipComplete } = this.props;
    setExtendMembership();
    setExtendMembershipComplete();
    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  _onNoClick = () => {
    const { setNotExtendMembership, setExtendMembershipComplete } = this.props;
    setNotExtendMembership();
    setExtendMembershipComplete();
    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  render() {
    const { is_extend_membership } = this.props;

    return (
      <MyMembershipsChocie
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
        is_extend_membership={is_extend_membership}
        is_first={this.state.is_first}
      />
    );
  }
}
export default Container;
