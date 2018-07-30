import React, { Component } from "react";
import SeatInfo from "./presenter";

class Container extends Component {
  state = {
    loading: true
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
      />
    );
  }
}
export default Container;
