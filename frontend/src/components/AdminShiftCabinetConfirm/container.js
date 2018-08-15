import React, { Component } from "react";
import AdminShiftCabinetConfirm from "./presenter";

class Container extends Component {
  state = {};

  _onConfirmClick = async () => {
    const { shiftCabinet, setWindowShowFalse } = this.props;
    await shiftCabinet();
    setWindowShowFalse();
  };

  render() {
    return <AdminShiftCabinetConfirm onConfirmClick={this._onConfirmClick} />;
  }
}
export default Container;
