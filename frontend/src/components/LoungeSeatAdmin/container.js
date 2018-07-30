import React, { Component } from "react";
import LoungeSeatAdmin from "./presenter";

class Container extends Component {
  state = { loading: true, show_seat: false };

  _onRoomAreaClick = room_id => {
    const { getRoomSeats } = this.props;
    getRoomSeats(room_id);
    this.setState({
      ...this.state,
      show_seat: true
    });
  };

  _closeRoom = () => {
    this.setState({
      ...this.state,
      show_seat: false
    });
  };

  componentDidMount() {
    const { sel_branch_for_seat_man } = this.props;
    if (sel_branch_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sel_branch_for_seat_man) {
      if (
        this.props.sel_branch_for_seat_man !== nextProps.sel_branch_for_seat_man
      ) {
        this.setState({
          ...this.state,
          loading: true
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading) {
      if (this.props.sel_branch_for_seat_man) {
        this.setState({
          ...this.state,
          loading: false
        });
      }
    }
  }

  render() {
    const { sel_branch_for_seat_man } = this.props;
    return (
      <LoungeSeatAdmin
        sel_branch_for_seat_man={sel_branch_for_seat_man}
        loading={this.state.loading}
        onRoomAreaClick={this._onRoomAreaClick}
        show_seat={this.state.show_seat}
        show_seat_loading={this.state.show_seat_loading}
        closeRoom={this._closeRoom}
      />
    );
  }
}
export default Container;
