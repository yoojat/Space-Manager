import React, { Component } from "react";
import EnrollCabinetOnly from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    cabinet_list_is_first: true
  };

  componentWillMount() {
    const {
      setEnrollCabinetTargetUser,
      user,
      branches,
      fetchBranches,
      clearEnrollMembership,
      clearExtendMembership,
      clearEnrollCabinet,
      clearExtendCabinet
    } = this.props;
    setEnrollCabinetTargetUser(user);
    if (!branches) {
      fetchBranches();
    }

    clearEnrollMembership();
    clearExtendMembership();
    clearEnrollCabinet();
    clearExtendCabinet();
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
    const { branches, sel_branch } = nextProps;
    if (branches) {
      this.setState({
        ...this.state,
        loading: false
      });
    }

    if (sel_branch) {
      this.setState({
        ...this.state,
        cabinet_list_is_first: false
      });
    }
  }

  render() {
    const {
      sel_cabinet_cost_type,
      sel_branch,
      sel_cabinet_set,
      cabinets_to_enroll,
      user
    } = this.props;
    return (
      <EnrollCabinetOnly
        sel_cabinet_cost_type={sel_cabinet_cost_type}
        sel_branch={sel_branch}
        loading={this.state.loading}
        sel_cabinet_set={sel_cabinet_set}
        cabinets_to_enroll={cabinets_to_enroll}
        cabinet_list_is_first={this.state.cabinet_list_is_first}
        user={user}
      />
    );
  }
}
export default Container;
