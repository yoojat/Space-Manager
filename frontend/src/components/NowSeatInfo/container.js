import React, { Component } from "react";
import NowSeatInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_member_seat_logs } = this.props;
    console.log(now_view_member_seat_logs);
    return (
      <NowSeatInfo now_view_member_seat_logs={now_view_member_seat_logs} />
    );
  }
}
export default Container;
