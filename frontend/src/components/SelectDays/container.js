import React, {Component} from 'react';
import SelectDays from './presenter';

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
      this.setState({...this.state, selected_button: nextProps.cost_type.id});
    }
  }

  _onDaysClick = cost_type => {
    // console.log('cost_type_id:', cost_type.id);
    this.props.setSelCostType(cost_type);
    // this.setState({...this.state, selected_button: cost_type.id});
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
