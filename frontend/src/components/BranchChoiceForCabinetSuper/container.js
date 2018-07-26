import React, { Component } from "react";
import BranchChoiceForCabinetSuper from "./presenter";

class Container extends Component {
  state = {};
  _onBranchClick = e => {
    const {
      clearEnrollCabinet,
      setShowEnrollCabinetIsFirstTrue,
      fetchSelBranch
    } = this.props;
    clearEnrollCabinet();
    setShowEnrollCabinetIsFirstTrue();
    fetchSelBranch(e.target.id);
  };
  render() {
    const { branches, sel_branch } = this.props;
    return (
      <BranchChoiceForCabinetSuper
        onBranchClick={this._onBranchClick}
        branches={branches}
        sel_branch={sel_branch}
      />
    );
  }
}

export default Container;
