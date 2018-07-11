import React, { Component } from "react";
import CabinetSetChoice from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {
    is_first: true
  };

  _cabinetYesClick = () => {
    const {
      setIsEnrollCabinet,
      setAllInfoNotSetup,
      is_enroll_cabinet,
      all_info_setup
    } = this.props;

    if (all_info_setup) {
      setAllInfoNotSetup();
    }
    if (!is_enroll_cabinet) {
      setIsEnrollCabinet(); //사물함을 사용한다고 체크
    }
    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };
  _cabinetNoClick = () => {
    const {
      setIsEnrollCabinet,
      setIsEnrollCabinetNo,
      setAllInfoSetup,
      all_info_setup,
      is_enroll_cabinet
    } = this.props;
    // clearSelCabinets();

    if (is_enroll_cabinet) {
      setIsEnrollCabinetNo();
    }

    if (!all_info_setup) {
      setAllInfoSetup();
    }
    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  render() {
    const {
      is_enroll_cabinet,
      select_cabinet_choice,
      sel_branch,
      sel_cost_type
    } = this.props;
    return (
      <CabinetSetChoice
        is_enroll_cabinet={is_enroll_cabinet}
        // select_cabinet_choice={select_cabinet_choice}
        cabinetYesClick={this._cabinetYesClick}
        cabinetNoClick={this._cabinetNoClick}
        sel_branch={sel_branch}
        sel_cost_type={sel_cost_type}
        is_first={this.state.is_first}
      />
    );
  }
}
export default Container;
