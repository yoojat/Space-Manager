import React, { Component } from "react";
import SeatAdmin from "./presenter";

class Container extends Component {
  state = { loading: true, show_lounge: false };

  _onBranchRowClick = branch_id => {
    const { getBranchInfo, sel_branch_for_seat_man } = this.props;
    getBranchInfo(branch_id);
  };

  componentWillMount() {
    const { branches, fetchBranches } = this.props;
    if (!branches) {
      fetchBranches();
    }
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
    const { branches, sel_branch_for_seat_man } = nextProps;
    if (branches) {
      this.setState({
        ...this.state,
        loading: false
      });
    }

    if (sel_branch_for_seat_man) {
      this.setState({
        ...this.state,
        show_lounge: true
      });
    }
  }

  render() {
    const { branches } = this.props;

    return (
      <SeatAdmin
        branches={branches}
        loading={this.state.loading}
        onBranchRowClick={this._onBranchRowClick}
        show_lounge={this.state.show_lounge}
      />
    );
  }
}
export default Container;
