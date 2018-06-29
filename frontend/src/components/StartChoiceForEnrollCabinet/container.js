import React, { Component } from "react";
import StartChoiceForEnrollCabinet from "./presenter";
import moment from "moment";
import { scroller } from "react-scroll";

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

  componentDidMount() {
    scroller.scrollTo("StartChoiceForEnrollCabinet", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  componentWillMount() {
    const { fetchCabinetCostTypes } = this.props;

    fetchCabinetCostTypes();
  }

  render() {
    const {
      start_datetime,
      cabinet_cost_types,
      cabinets_to_enroll
    } = this.props;
    return (
      <StartChoiceForEnrollCabinet
        cabinets_to_enroll={cabinets_to_enroll}
        start_datetime={start_datetime}
        onStartDatetimeChange={this._onStartDatetimeChange}
        cabinet_cost_types={cabinet_cost_types}
      />
    );
  }
}
export default Container;
