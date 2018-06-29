import React, { Component } from "react";
import StartChoice from "./presenter";
import moment from "moment";
import { scroller } from "react-scroll";

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

  componentDidMount() {
    scroller.scrollTo("startChoice", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  componentWillMount() {
    const {
      fetchMembershipCostTypes,
      setEnrollMembershipStartDatetime
    } = this.props;
    fetchMembershipCostTypes();
    setEnrollMembershipStartDatetime(moment().format("YYYY-MM-DD HH:mm:ss"));
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
