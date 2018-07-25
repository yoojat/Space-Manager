import React, { Component } from "react";
import SuperExtendCabinet from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {
    is_first: true
  };

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
    onExtendNoCabinetClick();
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

  componentDidMount() {
    scroller.scrollTo("SuperExtendCabinet", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  componentWillMount() {
    const { user, setExtendCabinetTargetUser } = this.props;
    setExtendCabinetTargetUser(user);
  }

  render() {
    const { is_extend_cabinet, cabinets_extend } = this.props;

    return (
      <SuperExtendCabinet
        is_first={this.state.is_first}
        is_extend_cabinet={is_extend_cabinet}
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
        cabinets_extend={cabinets_extend}
      />
    );
  }
}
export default Container;
