import React, { Component } from "react";
import AdminAllocateConfirm from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { sel_user_for_seat_man } = this.props;
    if (sel_user_for_seat_man) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_user_for_seat_man } = nextProps;
    if (sel_user_for_seat_man) {
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

  _onAllocateYesClick = () => {
    const {
      superAllocateSeat,
      sel_user_for_seat_man,
      sel_seat_for_seat_man
    } = this.props;
    superAllocateSeat(sel_user_for_seat_man.id, sel_seat_for_seat_man.id);
    console.log("배정하고 창닫고 업데이트하기");
  };

  render() {
    const { sel_user_for_seat_man, sel_seat_for_seat_man } = this.props;
    return (
      <AdminAllocateConfirm
        sel_user_for_seat_man={sel_user_for_seat_man}
        loading={this.state.loading}
        onAllocateYesClick={this._onAllocateYesClick}
        sel_seat_for_seat_man={sel_seat_for_seat_man}
      />
    );
  }
}
export default Container;
