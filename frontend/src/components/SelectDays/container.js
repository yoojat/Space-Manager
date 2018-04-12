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

  render() {
    return <SelectDays {...this.state} {...this.props} />;
  }
}

export default Container;
