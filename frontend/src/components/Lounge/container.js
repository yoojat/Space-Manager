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

    //현재 배정중인 좌석이 있다면
    if (this.props.now_using) {
      this.props.getRoomSeats(this.props.now_using.room.id);
      this.setState({
        ...this.state,
        seeingRoom: true
      });
    }
  }

  _onReturnBtnClick = () => {
    const { now_using, returnSeat, getBranch, getRoomSeats, room } = this.props;
    returnSeat(now_using.id);
    getBranch();
    // getRoomSeats(room.id);
  };

  render() {
    const { branch_name, profile_image, username, name } = this.props;
    return (
      <Lounge
        {...this.props}
        {...this.state}
        branch_name={branch_name}
        profile_image={profile_image}
        openRoom={this._openRoom}
        closeRoom={this._closeRoom}
        onReturnBtnClick={this._onReturnBtnClick}
        username={username}
        name={name}
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
