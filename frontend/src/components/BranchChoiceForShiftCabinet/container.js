import React, { Component } from "react";
import BranchChoiceForShiftCabinet from "./presenter";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
  }

  componentDidMount() {
    const { branches } = this.props;
    if (branches) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { branches } = nextProps;
    if (branches) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  _onBranchClick = e => {
    const { getSelBranch } = this.props;
    getSelBranch(e.target.id);
  };
  render() {
    const { branches, sel_branch } = this.props;
    return (
      <BranchChoiceForShiftCabinet
        onBranchClick={this._onBranchClick}
        branches={branches}
        sel_branch={sel_branch}
        loading={this.state.loading}
      />
    );
  }
}

export default Container;
