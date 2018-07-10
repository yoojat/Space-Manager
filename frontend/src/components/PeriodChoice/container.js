import React, { Component } from "react";
import PeriodChoice from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  _onPeriodClick = id => {
    const {
      membership_cost_types,
      setSelCostType,
      start_datetime,
      setSelEnrollMembershipEndDateTime
      // setAllInfoSetup,
      // setAllInfoNotSetup,
      // all_info_setup
    } = this.props;
    const target_cost_type = membership_cost_types.find(function(cost_type) {
      return cost_type.id === id;
    });
    const sel_end_datetime = moment(start_datetime)
      .add(Number(target_cost_type.days) * 24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");
    setSelCostType(target_cost_type);
    setSelEnrollMembershipEndDateTime(sel_end_datetime);
    // if (target_cost_type.days <= 1) {
    //   if (!all_info_setup) {
    //     setAllInfoSetup();
    //   }
    // } else {
    //   if (all_info_setup) {
    //     setAllInfoNotSetup();
    //   }
    // }
  };

  render() {
    const { membership_cost_types, sel_cost_type, end_datetime } = this.props;
    return (
      <PeriodChoice
        membership_cost_types={membership_cost_types}
        onPeriodClick={this._onPeriodClick}
        sel_cost_type={sel_cost_type}
        end_datetime={end_datetime}
      />
    );
  }
}
export default Container;
