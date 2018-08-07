import React, { Component } from "react";
import CabinetAdmin from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { sel_branch, sel_cabinet } = this.props;
    return <CabinetAdmin sel_branch={sel_branch} sel_cabinet={sel_cabinet} />;
  }
}
export default Container;
