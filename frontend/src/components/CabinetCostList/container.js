import React, { Component } from "react";
import CabinetCostList from "./presenter";

class Container extends Component {
  state = {};

  _onCabinetCostListClick = () => {
    const { cabinet_cost_type, setExtendCabinetCostType } = this.props;
    setExtendCabinetCostType(cabinet_cost_type);
  };

  render() {
    const { cabinet_cost_type, sel_cabinet_costtype } = this.props;
    return (
      <CabinetCostList
        onCabinetCostListClick={this._onCabinetCostListClick}
        cabinet_cost_type={cabinet_cost_type}
        sel_cabinet_costtype={sel_cabinet_costtype}
      />
    );
  }
}
export default Container;
