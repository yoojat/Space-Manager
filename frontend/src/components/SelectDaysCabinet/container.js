import React, { Component } from "react";
import SelectDays from "./presenter";
import { animateScroll as scroll } from "react-scroll";

class Container extends Component {
  state = {
    loading: true,
    selected_button: null
  };

  componentWillMount() {
    // const {getMembershipCostTypes} = this.props;
    // getMembershipCostTypes();
  }

  componentDidMount() {
    const { cabinet_cost_types } = this.props;
    if (cabinet_cost_types) {
      this.setState({
        ...this.state,
        loading: false
      });
    } else {
      this.props.getCabietCostTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cabinet_cost_types) {
      this.setState({ ...this.state, loading: false });
    }

    if (nextProps.cabinet_cost_types) {
      this.setState({
        ...this.state,
        loading: false,
        selected_button: nextProps.cabinet_cost_types.id
      });
    }
  }

  componentDidUpdate() {
    scroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  _onDaysClick = (cost_type, end_datetime) => {
    this.props.setSelCabinetCostType(cost_type);
    this.props.setSelEndDateTime(end_datetime);
    this.props.clearSelCabinets();
    this.props.setAllInfoSetup();
  };

  render() {
    return (
      <SelectDays
        {...this.state}
        {...this.props}
        onDaysClick={this._onDaysClick}
      />
    );
  }
}

export default Container;
