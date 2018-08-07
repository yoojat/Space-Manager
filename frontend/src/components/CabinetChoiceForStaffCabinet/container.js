import React, { Component } from "react";
import CabinetChoiceForStaffCabinet from "./presenter";
import moment from "moment";
import { scroller } from "react-scroll";

class Container extends Component {
  state = { loading: true, is_first: true };

  _onCabinetClick = sel_cabinet => {
    const { setSelCabinetStaffCabinet } = this.props;
    setSelCabinetStaffCabinet(sel_cabinet);
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
      scroller.scrollTo("CabinetChoiceForStaffCabinet", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: 50
      });
      setScrollFirstFalseStaffCabinet();
    }
  }

  render() {
    const { sel_cabinet_set, sel_cabinet } = this.props;
    return (
      <CabinetChoiceForStaffCabinet
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
        onCabinetClick={this._onCabinetClick}
        sel_cabinet={sel_cabinet}
      />
    );
  }
}
export default Container;
