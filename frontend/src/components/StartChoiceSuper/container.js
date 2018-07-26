import React, { Component } from "react";
import StartChoiceSuper from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  _onStartDatetimeChange = moment_obj => {
    const {
      setEnrollMembershipStartDatetime,
      sel_cost_type,
      setSelEnrollMembershipEndDateTime
    } = this.props;
    const sel_datetime = moment_obj.format("YYYY-MM-DD HH:mm:ss");
    setEnrollMembershipStartDatetime(sel_datetime);
    if (sel_cost_type) {
      const sel_end_datetime = moment(sel_datetime)
        .add(Number(sel_cost_type.days) * 24, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      setSelEnrollMembershipEndDateTime(sel_end_datetime);
    }
  };

  componentWillMount() {
    const {
      fetchMembershipCostTypes,
      setEnrollMembershipStartDatetime
    } = this.props;
    fetchMembershipCostTypes();
    setEnrollMembershipStartDatetime(moment().format("YYYY-MM-DD HH:mm:ss"));
  }

  componentDidMount() {
    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    const target = document.getElementById("regist_content");
    target.scrollTop = target.scrollHeight;
  }

  render() {
    const { start_datetime, membership_cost_types } = this.props;
    return (
      <StartChoiceSuper
        start_datetime={start_datetime}
        onStartDatetimeChange={this._onStartDatetimeChange}
        membership_cost_types={membership_cost_types}
      />
    );
  }
}
export default Container;
