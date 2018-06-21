import React, { Component } from "react";
import CabinetListForEnrollCabinet from "./presenter";

class Container extends Component {
  state = {};

  _onCabinetCancelClick = () => {
    const { cabinet_to_enroll, subtractCabinetToEnroll } = this.props;
    subtractCabinetToEnroll(cabinet_to_enroll);
  };

  render() {
    const { cabinet_to_enroll, subtractCabinetToEnroll } = this.props;
    return (
      <CabinetListForEnrollCabinet
        cabinet_to_enroll={cabinet_to_enroll}
        subtractCabinetToEnroll={subtractCabinetToEnroll}
        onCabinetCancelClick={this._onCabinetCancelClick}
      />
    );
  }
}
export default Container;
