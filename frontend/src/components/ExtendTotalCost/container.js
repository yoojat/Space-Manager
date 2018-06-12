import React, { Component } from "react";
import ExtendTotalCost from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  render() {
    const {
      membership_to_extended,
      sel_cost_type,
      will_extend_cabinet,
      cabinets_to_extended,
      sel_cabinet_cost_type,
      all_info_setup
    } = this.props;

    const cal_membership_end_datetime = moment(
      membership_to_extended.end_datetime
    )
      .add(Number(sel_cost_type.days) * 24, "hour")
      .format("YYYY-MM-DD HH:mm:ss");

    const membership_cost = sel_cost_type.cost;
    let cabinet_cost = 0;
    cabinets_to_extended.forEach(cabinet_to_extended => {
      cabinet_cost = cabinet_cost + sel_cabinet_cost_type.cost;
    });

    return (
      <ExtendTotalCost
        membership_to_extended={membership_to_extended}
        sel_cost_type={sel_cost_type}
        will_extend_cabinet={will_extend_cabinet}
        cabinets_to_extended={cabinets_to_extended}
        sel_cabinet_cost_type={sel_cabinet_cost_type}
        all_info_setup={all_info_setup}
        cal_membership_end_datetime={cal_membership_end_datetime}
        membership_cost={membership_cost}
        cabinet_cost={cabinet_cost}
      />
    );
  }
}
export default Container;
