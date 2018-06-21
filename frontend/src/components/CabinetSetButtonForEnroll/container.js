import React, { Component } from "react";
import CabinetSetButtonForEnroll from "./presenter";

class Container extends Component {
  state = {};

  _onClickCabinetSetButton = () => {
    const { cabinet_set, fetchSelCabinetSet } = this.props;
    fetchSelCabinetSet(cabinet_set.id);
  };

  _onMouseEnterCabinetSetButton = () => {
    const { cabinet_set, setTempCabinetSet } = this.props;
    setTempCabinetSet(cabinet_set);
  };

  _onMouseLeaveCabinetSetButton = () => {
    const { resetTempCabinetSet } = this.props;
    resetTempCabinetSet();
  };

  render() {
    const { cabinet_set, temp_cabinet_set, sel_cabinet_set } = this.props;
    return (
      <CabinetSetButtonForEnroll
        cabinet_set={cabinet_set}
        sel_cabinet_set={sel_cabinet_set}
        temp_cabinet_set={temp_cabinet_set}
        onMouseEnterCabinetSetButton={this._onMouseEnterCabinetSetButton}
        onMouseLeaveCabinetSetButton={this._onMouseLeaveCabinetSetButton}
        onClickCabinetSetButton={this._onClickCabinetSetButton}
      />
    );
  }
}
export default Container;
