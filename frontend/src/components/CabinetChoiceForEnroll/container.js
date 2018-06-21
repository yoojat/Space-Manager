import React, { Component } from "react";
import CabinetChoiceForEnroll from "./presenter";
import moment from "moment";

class Container extends Component {
  state = { loading: true };

  _onCabinetClick = sel_cabinet => {
    const {
      addCabinetToEnroll,
      sel_start_datetime,
      setStartDatetime
    } = this.props;
    //스테이트에 있는 사물함들(sel_cabinets) 중 선태한 사물함이 있는 지 확인
    addCabinetToEnroll(sel_cabinet);
    if (!sel_start_datetime) {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      setStartDatetime(now);
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
    const { sel_cabinet_set, my_cabinets } = this.props;
    if (sel_cabinet_set && my_cabinets) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { sel_cabinet_set, cabinets_to_enroll, my_cabinets } = this.props;
    return (
      <CabinetChoiceForEnroll
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
