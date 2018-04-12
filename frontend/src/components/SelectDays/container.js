import React, {Component} from 'react';
import SelectDays from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    const {getMembershipCostTypes} = this.props;
    getMembershipCostTypes();
  }

  componentDidMount() {
    if (this.props.membership_cost_types) {
      this.setState({...this.state, loading: false});
    } else {
      this.props.getMembershipCostTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.membership_cost_types) {
      this.setState({...this.state, loading: false});
    }
  }

  _onDaysClick = cost_type => {
    // console.log(daysId);
    this.props.setSelCostType(cost_type);
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
