import React, { Component } from "react";
import StartChoice from "./presenter";
import moment from "moment";
class Container extends Component {
  state = {};

  _onStartDatetimeChange = moment_obj => {
    const { setStartDatetime, sel_cost_type, setSelEndDateTime } = this.props;
    const sel_datetime = moment_obj.format("YYYY-MM-DD HH:mm");
    setStartDatetime(sel_datetime);
    if (sel_cost_type) {
      const sel_end_datetime = moment(sel_datetime)
        .add(Number(sel_cost_type.days) * 24, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      setSelEndDateTime(sel_end_datetime);
    }
  };

  componentWillMount() {
    const { fetchMembershipCostTypes, setStartDatetime } = this.props;
    fetchMembershipCostTypes();
    setStartDatetime(moment().format("YYYY-MM-DD HH:mm"));
  }

  render() {
    const { start_datetime, membership_cost_types } = this.props;
    return (
      <StartChoice
        start_datetime={start_datetime}
        onStartDatetimeChange={this._onStartDatetimeChange}
        membership_cost_types={membership_cost_types}
      />
    );
  }
}
export default Container;
