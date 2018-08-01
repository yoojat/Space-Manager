import React, { Component } from "react";
import SeatInfo from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    show_assign: false,
    show_return: false
  };

  _setShowAssignFalse = () => {
    this.setState({
      ...this.state,
      show_assign: false
    });
  };

  _setShowReturnFalse = () => {
    this.setState({
      ...this.state,
      show_return: false
    });
  };

  _onReturnButtonClick = () => {
    this.setState({
      ...this.state,
      show_return: true
    });
  };

  _onAllocateButtonClick = () => {
    this.setState({
      ...this.state,
      show_assign: true
    });
  };
  componentDidMount() {
    const { sel_seat_for_seat_man } = this.props;
    if (sel_seat_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_seat_for_seat_man } = nextProps;
    if (sel_seat_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    } else {
      this.setState({
        ...this.state,
        loading: true
      });
    }
  }

  render() {
    const {
      sel_room_for_seat_man,
      sel_seat_for_seat_man,
      sel_branch_for_seat_man
    } = this.props;
    return (
      <SeatInfo
        loading={this.state.loading}
        sel_room_for_seat_man={sel_room_for_seat_man}
        sel_seat_for_seat_man={sel_seat_for_seat_man}
        sel_branch_for_seat_man={sel_branch_for_seat_man}
        onReturnButtonClick={this._onReturnButtonClick}
        onAllocateButtonClick={this._onAllocateButtonClick}
        show_assign={this.state.show_assign}
        show_return={this.state.show_return}
        setShowAssignFalse={this._setShowAssignFalse}
        setShowReturnFalse={this._setShowReturnFalse}
      />
    );
  }
}
export default Container;
