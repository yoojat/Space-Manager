import React, { Component } from "react";
import ExtendPeriodChoice from "./presenter";

class Container extends Component {
  state = {};

  componentWillMount() {
    const { fetchMembershipCostTypes, membership_cost_types } = this.props;
    if (!membership_cost_types.length) {
      fetchMembershipCostTypes();
    }
  }

  _onPeriodClick = id => {
    // const {
    //   membership_cost_types,
    //   setSelCostType,
    //   start_datetime,
    //   setSelEndDateTime,
    //   setAllInfoSetup,
    //   setAllInfoNotSetup,
    //   all_info_setup
    // } = this.props;
    // const target_cost_type = membership_cost_types.find(function(cost_type) {
    //   return cost_type.id === id;
    // });
    // const sel_end_datetime = moment(start_datetime)
    //   .add(Number(target_cost_type.days) * 24, "hour")
    //   .format("YYYY-MM-DD HH:mm:ss");
    // setSelCostType(target_cost_type);
    // setSelEndDateTime(sel_end_datetime);
    // if (target_cost_type.days <= 1) {
    //   if (!all_info_setup) {
    //     setAllInfoSetup();
    //   }
    // } else {
    //   if (all_info_setup) {
    //     setAllInfoNotSetup();
    //   }
    // }

    const { membership_cost_types, setExtendCostType } = this.props;

    const searched_cost_type = membership_cost_types.find(
      membership_cost_type => membership_cost_type.id === id
    );
    setExtendCostType(searched_cost_type);
  };

  render() {
    const {
      membership_extend,
      membership_cost_types,
      sel_cost_type
    } = this.props;
    return (
      <ExtendPeriodChoice
        membership_extend={membership_extend}
        membership_cost_types={membership_cost_types}
        onPeriodClick={this._onPeriodClick}
        sel_cost_type={sel_cost_type}
      />
    );
  }
}
export default Container;
