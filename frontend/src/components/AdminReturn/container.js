import React, { Component } from "react";
import AdminReturn from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { sel_seat_for_seat_man, getUserForAllocate } = this.props;
    getUserForAllocate(sel_seat_for_seat_man.now_user);
  }

  componentDidMount() {
    const { sel_seat_for_seat_man, sel_user_for_seat_man } = this.props;
    if (sel_seat_for_seat_man && sel_user_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_seat_for_seat_man, sel_user_for_seat_man } = nextProps;
    if (sel_seat_for_seat_man && sel_user_for_seat_man) {
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

  _onYesClick = () => {
    const { superReturnSeat, sel_seat_for_seat_man } = this.props;
    superReturnSeat(sel_seat_for_seat_man.id);
    console.log("yes");
  };

  _onNoClick = () => {
    console.log("no");
  };

  render() {
    const { sel_seat_for_seat_man, sel_user_for_seat_man } = this.props;
    return (
      <AdminReturn
        loading={this.state.loading}
        sel_seat_for_seat_man={sel_seat_for_seat_man}
        sel_user_for_seat_man={sel_user_for_seat_man}
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
      />
    );
  }
}
export default Container;
