import React, { Component } from "react";
import RegistCabinetSuper from "./presenter";

class Container extends Component {
  render() {
    const { my_cabinets } = this.props;

    return <RegistCabinetSuper my_cabinets={my_cabinets} />;
  }
}
export default Container;
