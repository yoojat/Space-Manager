import React, { Component } from "react";
import CabinetChoiceExtendSuper from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { my_cabinets } = this.props;

    return <CabinetChoiceExtendSuper my_cabinets={my_cabinets} />;
  }
}
export default Container;
