import React, { Component } from "react";
import CabinetPeriodChoiceExtend from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const {
      fetchExtendCabinetCostTypes,
      extend_cabinet_cost_types
    } = this.props;
    if (!extend_cabinet_cost_types.length) {
      fetchExtendCabinetCostTypes();
    }
  }

  componentDidMount() {
    const { extend_cabinet_cost_types } = this.props;
    scroller.scrollTo("CabinetChoiceExtend", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
    if (extend_cabinet_cost_types.length) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { extend_cabinet_cost_types } = nextProps;
    if (extend_cabinet_cost_types.length) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { extend_cabinet_cost_types } = this.props;
    return (
      <CabinetPeriodChoiceExtend
        extend_cabinet_cost_types={extend_cabinet_cost_types}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
