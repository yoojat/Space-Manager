import React, {Component} from 'react';
import SelectBranch from './presenter';

class Container extends Component {
  state = {
    loading: true,
    selBranchId: null,
  };

  _handleBranchClick = event => {
    this.setState({
      ...this.state,
      selBranchId: event.target.id,
    });

    this.props.setSelBranchId(event.target.id);
  };

  componentWillMount() {
    const {getBranches} = this.props;
    getBranches();
  }
  componentDidMount() {
    const {getBranches} = this.props;

    if (this.props.branches) {
      this.setState({...this.state, loading: false});
    } else {
      getBranches();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.branches) {
      this.setState({...this.state, loading: false});
    }
  }

  render() {
    return (
      <SelectBranch
        branches={this.props.branches}
        handleBranchClick={this._handleBranchClick}
        {...this.state}
      />
    );
  }
}

export default Container;
