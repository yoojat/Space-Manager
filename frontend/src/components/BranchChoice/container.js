import React, { Component } from "react";
import BranchChoice from "./presenter";

class Container extends Component {
  state = {};
  _onBranchClick = e => {
    const {
      fetchSelBranch,
      clearEnrollCabinet,
      clearExtendCabinet,
      setShowEnrollCabinetIsFirstTrue
    } = this.props;
    fetchSelBranch(e.target.id);
    clearExtendCabinet();
    clearEnrollCabinet();
    setShowEnrollCabinetIsFirstTrue();
  };
  render() {
    const { branches, sel_branch } = this.props;
    return (
      <BranchChoice
        onBranchClick={this._onBranchClick}
        branches={branches}
        sel_branch={sel_branch}
      />
    );
  }
}

export default Container;
