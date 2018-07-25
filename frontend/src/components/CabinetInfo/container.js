import React, { Component } from "react";
import CabinetInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { now_view_member_cabinets } = this.props;
    return <CabinetInfo now_view_member_cabinets={now_view_member_cabinets} />;
  }
}
export default Container;
