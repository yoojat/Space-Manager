import React, { Component } from "react";
import CabinetPeriodChoiceExtend from "./presenter";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const { fetCabinetCostTypes, cabinet_cost_types } = this.props;
    if (!cabinet_cost_types.length) {
      fetCabinetCostTypes();
    }
  }

  componentDidMount() {
    const { cabinet_cost_types } = this.props;
    if (cabinet_cost_types.length) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cabinet_cost_types } = nextProps;
    if (cabinet_cost_types.length) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { cabinet_cost_types } = this.props;
    return (
      <CabinetPeriodChoiceExtend
        cabinet_cost_types={cabinet_cost_types}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
