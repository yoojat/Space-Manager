import React, { Component } from "react";
import AdminEnrollCabinetLock from "./presenter";

class Container extends Component {
  state = {
    lock_num: "",
    password: "",
    loading: true
  };

  componentWillMount() {
    const { cablock_id, getCabinetLockByLockId } = this.props;
    getCabinetLockByLockId(cablock_id);
  }

  componentWillReceiveProps(nextProps) {
    const { cab_lock_modify } = nextProps;
    if (cab_lock_modify) {
      this.setState({
        ...this.state,
        loading: false,
        lock_num: cab_lock_modify.cabinet.cabinet_number,
        password: cab_lock_modify.lock_password
      });
    }
  }

  _onConfirmClick = () => {
    console.log(this.state);
  };

  _onLockNumChange = e => {
    this.setState({
      ...this.state,
      lock_num: e.target.value
    });
  };

  _onPasswordChange = e => {
    this.setState({
      ...this.state,
      password: e.target.value
    });
  };

  render() {
    const { sel_branch, cab_lock_modify } = this.props;
    return (
      <AdminEnrollCabinetLock
        onConfirmClick={this._onConfirmClick}
        sel_branch={sel_branch}
        onLockNumChange={this._onLockNumChange}
        onPasswordChange={this._onPasswordChange}
        lock_num={this.state.lock_num}
        password={this.state.password}
        loading={this.state.loading}
        cab_lock_modify={cab_lock_modify}
      />
    );
  }
}
export default Container;
