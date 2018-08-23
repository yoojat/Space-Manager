import React, { Component } from "react";
import CabLockAdmin from "./presenter";
import AdminEnrollCabinetLock from "components/AdminEnrollCabinetLock";
import AdminModifyCabinetLock from "components/AdminModifyCabinetLock";

class Container extends Component {
  state = {
    loading: true,
    locks_show: false,
    locks_loading: true,
    window_content: null,
    window_title: null
  };

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
    const { branches, cabinet_locks } = nextProps;
    if (branches) {
      if (cabinet_locks) {
        this.setState({
          ...this.state,
          loading: false,
          locks_loading: false
        });
      } else {
        this.setState({
          ...this.state,
          loading: false,
          locks_loading: true
        });
      }
    }
  }

  _onBranchClick = async branch => {
    const {
      setBranchForCabinetLocks,
      fetchCabinetLocks,
      fetchCabinets
    } = this.props;
    await this.setState({
      ...this.state,
      locks_show: true
    });
    setBranchForCabinetLocks(branch);
    fetchCabinetLocks(branch.id);
    fetchCabinets(branch.id);
  };

  _onAddButtonClick = async () => {
    await this.setState({
      ...this.state,
      window_content: <AdminEnrollCabinetLock />,
      window_title: "자물쇠 등록"
    });
    const { setModalWindowShowTrue } = this.props;
    setModalWindowShowTrue();
  };

  _onModifyButtonClick = async cablock_id => {
    await this.setState({
      ...this.state,
      window_content: <AdminModifyCabinetLock cablock_id={cablock_id} />,
      window_title: "자물쇠 수정"
    });
    const { setModalWindowShowTrue } = this.props;
    setModalWindowShowTrue();
  };

  render() {
    const {
      branches,
      sel_branch,
      cabinet_locks,
      modal_show,
      cabinets,
      deleteLock
    } = this.props;
    return (
      <CabLockAdmin
        loading={this.state.loading}
        branches={branches}
        onBranchClick={this._onBranchClick}
        modal_show={modal_show}
        sel_branch={sel_branch}
        cabinet_locks={cabinet_locks}
        locks_show={this.state.locks_show}
        locks_loading={this.state.locks_loading}
        onAddButtonClick={this._onAddButtonClick}
        window_content={this.state.window_content}
        window_title={this.state.window_title}
        cabinets={cabinets}
        deleteLock={deleteLock}
        onModifyButtonClick={this._onModifyButtonClick}
      />
    );
  }
}
export default Container;
