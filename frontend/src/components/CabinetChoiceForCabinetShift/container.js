import React, { Component } from "react";
import CabinetChoiceForCabinetShift from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = { loading: true, is_first: true };

  _onCabinetClick = target_cabinet => {
    const { setTargetCabinetForStaffShiftCabinet } = this.props;
    setTargetCabinetForStaffShiftCabinet(target_cabinet);
  };

  componentWillReceiveProps(nextProps) {
    const { my_cabinets, sel_cabinet_set } = nextProps;

    if (sel_cabinet_set && my_cabinets) {
      if (this.state.loading) {
        this.setState({
          ...this.state,
          loading: false
        });
      }
    }
  }

  componentDidMount() {
    const {
      sel_cabinet_set,
      setScrollFirstFalseStaffCabinet,
      scroll_first
    } = this.props;
    if (sel_cabinet_set) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
    if (scroll_first) {
      scroller.scrollTo("CabinetChoiceForCabinetShift", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: 50
      });
      setScrollFirstFalseStaffCabinet();
    }
  }

  render() {
    const { sel_cabinet_set, target_cabinet } = this.props;
    return (
      <CabinetChoiceForCabinetShift
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
        onCabinetClick={this._onCabinetClick}
        target_cabinet={target_cabinet}
      />
    );
  }
}
export default Container;
