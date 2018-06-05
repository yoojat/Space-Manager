import React, { Component } from "react";
import CabinetSetChoice from "./presenter";

class Container extends Component {
  state = {};

  _cabinetYesClick = () => {
    const {
      setUseCabinet,
      setAllInfoNotSetup,
      use_cabinet,
      all_info_setup
    } = this.props;

    if (all_info_setup) {
      setAllInfoNotSetup();
    }
    if (!use_cabinet) {
      setUseCabinet(); //사물함을 사용한다고 체크
    }
  };
  _cabinetNoClick = () => {
    const {
      setUseNoCabinet,
      clearSelCabinets,
      setAllInfoSetup,
      all_info_setup,
      use_cabinet
    } = this.props;
    clearSelCabinets();

    if (use_cabinet) {
      setUseNoCabinet();
    }

    if (!all_info_setup) {
      setAllInfoSetup();
    }
  };

  render() {
    const {
      use_cabinet,
      select_cabinet_choice,
      sel_branch,
      sel_cost_type
    } = this.props;
    return (
      <CabinetSetChoice
        use_cabinet={use_cabinet}
        select_cabinet_choice={select_cabinet_choice}
        cabinetYesClick={this._cabinetYesClick}
        cabinetNoClick={this._cabinetNoClick}
        sel_branch={sel_branch}
        sel_cost_type={sel_cost_type}
      />
    );
  }
}
export default Container;
