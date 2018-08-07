import React, { Component } from "react";
import CabinetSetForCabinetStaff from "./presenter";

class Container extends Component {
  state = {};

  _cabinetSetClickHandler = () => {
    const { fetchSelCabinetSet, cabinet_set } = this.props;
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
    // cabinet_set는 전달을 통해 받는 값
    const { cabinet_set, sel_cabinet_set, temp_cabinet_set } = this.props;
    return (
      <CabinetSetForCabinetStaff
        cabinet_set={cabinet_set}
        cabinetSetClickHandler={this._cabinetSetClickHandler}
        sel_cabinet_set={sel_cabinet_set}
        temp_cabinet_set={temp_cabinet_set}
        onMouseEnterCabinetSetButton={this._onMouseEnterCabinetSetButton}
        onMouseLeaveCabinetSetButton={this._onMouseLeaveCabinetSetButton}
      />
    );
  }
}
export default Container;
