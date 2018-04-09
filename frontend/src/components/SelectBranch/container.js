import React, {Component} from 'react';
import SelectBranch from './presenter';

class Container extends Component {
  state = {
    loading: true,
    selBranchId: null,
    showMap: false,
  };

  _handleBranchClick = event => {
    this.setState({
      ...this.state,
      selBranchId: event.target.id,
    });

    this.props.setSelBranchId(event.target.id);
  };

  _handleShowMapButtonClick = event => {
    this.setState({
      ...this.state,
      showMap: !this.state.showMap,
    });
  };

  _handleMarkerClick = id => {
    const branchId = id.toString();
    this.setState({
      ...this.state,
      selBranchId: branchId,
    });

    this.props.setSelBranchId(branchId);
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
        handleShowMapButtonClick={this._handleShowMapButtonClick}
        handleMarkerClick={this._handleMarkerClick}
        {...this.state}
      />
    );
  }
}

export default Container;
