import React, { Component } from "react";
import CabinetCostListForEnroll from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  _onCabinetCostListClick = () => {
    const {
      cabinet_cost_type,
      setCabinetCostType,
      sel_start_datetime,
      setEndDatetime,
      enrollCabinetAllInfoSetup,
      all_info_complete
    } = this.props;
    const addDays = cabinet_cost_type.days;
    setCabinetCostType(cabinet_cost_type);
    const cal_end_datetime = moment(sel_start_datetime)
      .add(Number(addDays) * 24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
    setEndDatetime(cal_end_datetime);
    if (!all_info_complete) {
      enrollCabinetAllInfoSetup();
    }
  };

  render() {
    const { cabinet_cost_type, sel_cabinet_cost_type } = this.props;
    return (
      <CabinetCostListForEnroll
        onCabinetCostListClick={this._onCabinetCostListClick}
        cabinet_cost_type={cabinet_cost_type}
        sel_cabinet_cost_type={sel_cabinet_cost_type}
      />
    );
  }
}
export default Container;
