import React, {Component} from 'react';
import SelectDays from './presenter';
import {animateScroll as scroll} from 'react-scroll';

class Container extends Component {
  state = {
    loading: true,
    selected_button: null,
  };

  componentWillMount() {
    const {getMembershipCostTypes} = this.props;
    getMembershipCostTypes();
  }

  componentDidMount() {
    const {membersihp_cost_types} = this.props;
    if (membersihp_cost_types) {
      this.setState({
        ...this.state,
        loading: false,
      });
    } else {
      this.props.getMembershipCostTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.membership_cost_types) {
      this.setState({...this.state, loading: false});
    }

    if (nextProps.cost_type) {
      this.setState({
        ...this.state,
        loading: false,
        selected_button: nextProps.cost_type.id,
      });
    }
  }

  componentDidUpdate() {
    scroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  }

  _onDaysClick = (cost_type, end_datetime) => {
    this.props.setSelCostType(cost_type);
    this.props.setSelEndDateTime(end_datetime);
    this.props.clearSelCabinets();
    if (cost_type.cost_type === '1days') {
      this.props.setAllInfoSetup();
    } else {
      this.props.setAllInfoNotSetup();
    }
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
