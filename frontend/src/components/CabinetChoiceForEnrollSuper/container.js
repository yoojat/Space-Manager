import React, { Component } from "react";
import CabinetChoiceForEnrollSuper from "./presenter";
import moment from "moment";

class Container extends Component {
  state = { loading: true, is_first: true };

  _onCabinetClick = sel_cabinet => {
    const {
      addCabinetToEnroll,
      sel_start_datetime,
      setEnrollCabinetStartDatetime
    } = this.props;
    //스테이트에 있는 사물함들(sel_cabinets) 중 선태한 사물함이 있는 지 확인
    addCabinetToEnroll(sel_cabinet);
    if (!sel_start_datetime) {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      setEnrollCabinetStartDatetime(now);
    }
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
      my_cabinets,
      setScrollFirstFalse,
      scroll_first
    } = this.props;
    if (sel_cabinet_set && my_cabinets) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
    if (scroll_first) {
      setScrollFirstFalse();
    }

    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  render() {
    const { sel_cabinet_set, cabinets_to_enroll, my_cabinets } = this.props;
    return (
      <CabinetChoiceForEnrollSuper
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
        onCabinetClick={this._onCabinetClick}
        cabinets_to_enroll={cabinets_to_enroll}
        my_cabinets={my_cabinets}
      />
    );
  }
}
export default Container;
