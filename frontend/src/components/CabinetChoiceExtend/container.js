import React, { Component } from "react";
import CabinetChoiceExtend from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const { my_cabinets } = this.props;

    return <CabinetChoiceExtend my_cabinets={my_cabinets} />;
  }
}
export default Container;
