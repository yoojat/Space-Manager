import React, { Component } from "react";
import ExtendPeriodChoiceSuper from "./presenter";

class Container extends Component {
  state = {};

  componentWillMount() {
    const { fetchMembershipCostTypes, membership_cost_types } = this.props;
    if (!membership_cost_types.length) {
      fetchMembershipCostTypes();
    }
  }

  _onPeriodClick = id => {
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
      <ExtendPeriodChoiceSuper
        membership_extend={membership_extend}
        membership_cost_types={membership_cost_types}
        onPeriodClick={this._onPeriodClick}
        sel_cost_type={sel_cost_type}
      />
    );
  }
}
export default Container;
