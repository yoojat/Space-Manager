import React, { Component } from "react";
import StartChoiceForEnrollCabinetSuper from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  _onStartDatetimeChange = moment_obj => {
    const {
      setEnrollCabinetStartDatetime,
      sel_cabinet_cost_type,
      setEndDatetime
    } = this.props;
    const sel_datetime = moment_obj.format("YYYY-MM-DD HH:mm:ss");
    setEnrollCabinetStartDatetime(sel_datetime);
    if (sel_cabinet_cost_type) {
      const sel_end_datetime = moment(sel_datetime)
        .add(Number(sel_cabinet_cost_type.days) * 24, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      setEndDatetime(sel_end_datetime);
    }
  };

  componentWillMount() {
    const { fetchCabinetCostTypes } = this.props;

    fetchCabinetCostTypes();
  }

  componentDidMount() {
    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  componentDidUpdate(preProps, prevState) {
    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  render() {
    const {
      start_datetime,
      cabinet_cost_types,
      cabinets_to_enroll
    } = this.props;
    return (
      <StartChoiceForEnrollCabinetSuper
        cabinets_to_enroll={cabinets_to_enroll}
        start_datetime={start_datetime}
        onStartDatetimeChange={this._onStartDatetimeChange}
        cabinet_cost_types={cabinet_cost_types}
      />
    );
  }
}
export default Container;
