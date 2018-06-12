import React, { Component } from "react";
import CabinetCostList from "./presenter";

class Container extends Component {
  state = {};

  _onCabinetCostListClick = () => {
    const { cabinet_cost_type, setCabinetCostType } = this.props;
    setCabinetCostType(cabinet_cost_type);
  };

  componentWillReceiveProps(nextProps) {
    const {
      sel_cabinet_cost_type,
      setAllInfoSetup,
      setAllInfoNotSetup
    } = nextProps;
    if (sel_cabinet_cost_type) {
      setAllInfoSetup();
    } else {
      setAllInfoNotSetup();
    }
  }

  render() {
    const { cabinet_cost_type, sel_cabinet_cost_type } = this.props;
    return (
      <CabinetCostList
        onCabinetCostListClick={this._onCabinetCostListClick}
        cabinet_cost_type={cabinet_cost_type}
        sel_cabinet_cost_type={sel_cabinet_cost_type}
      />
    );
  }
}
export default Container;
