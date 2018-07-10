import React, { Component } from "react";
import ExtendCabinetOnly from "./presenter";

class Container extends Component {
  state = {
    is_first: true
  };

  componentWillMount() {
    const {
      clearEnrollMembership,
      clearExtendMembership,
      clearEnrollCabinet,
      clearExtendCabinet
    } = this.props;
    clearEnrollMembership();
    clearExtendMembership();
    clearEnrollCabinet();
    clearExtendCabinet();
  }

  _onYesClick = () => {
    const {
      setIsExtendCabinetTrue,
      is_extend_cabinet,
      onExtendYesCabinetClick
    } = this.props;

    if (!is_extend_cabinet) {
      setIsExtendCabinetTrue();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
    if (onExtendYesCabinetClick) {
      onExtendYesCabinetClick();
    }
  };

  _onNoClick = () => {
    const {
      setIsExtendCabinetFalse,
      is_extend_cabinet,
      clearExtendCabinet,
      onExtendNoCabinetClick
    } = this.props;

    if (is_extend_cabinet) {
      setIsExtendCabinetFalse();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }

    clearExtendCabinet();
    if (onExtendNoCabinetClick) {
      onExtendNoCabinetClick();
    }
  };

  componentWillReceiveProps(nextProps) {
    const before_sel_branch = this.props.sel_branch;
    const after_sel_branch = nextProps.sel_branch;

    if (before_sel_branch !== after_sel_branch) {
      this.setState({
        ...this.state,
        is_first: true
      });
    }
  }

  render() {
    const {
      is_extend_cabinet,
      cabinets_extend,
      sel_cabinet_costtype,
      user
    } = this.props;

    return (
      <ExtendCabinetOnly
        is_first={this.state.is_first}
        is_extend_cabinet={is_extend_cabinet}
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
        cabinets_extend={cabinets_extend}
        sel_cabinet_costtype={sel_cabinet_costtype}
        user={user}
      />
    );
  }
}
export default Container;
