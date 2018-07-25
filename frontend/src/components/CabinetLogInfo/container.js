import React, { Component } from "react";
import CabinetLogInfo from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { cabinet_historys } = this.props;
    return <CabinetLogInfo cabinet_historys={cabinet_historys} />;
  }
}
export default Container;
