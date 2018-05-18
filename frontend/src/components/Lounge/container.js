import React, { Component } from "react";
import Lounge from "./presenter";

class Container extends Component {
  state = {
    seeingRoom: false,
    modalLoading: true
  };
  componentDidMount() {
    this.props.setMembership();

    if (this.props.memberships) {
      this.setState({ ...this.state, modalLoading: false });
    }
  }

  render() {
    const { branch_name } = this.props;
    return (
      <Lounge
        {...this.props}
        {...this.state}
        branch_name={branch_name}
        openRoom={this._openRoom}
        closeRoom={this._closeRoom}
      />
    );
  }

  //열람실 정보를 인자로 전달
  _openRoom = () => {
    this.setState({
      seeingRoom: true
    });
  };

  _closeRoom = () => {
    this.setState({
      seeingRoom: false
    });
  };
}

export default Container;
