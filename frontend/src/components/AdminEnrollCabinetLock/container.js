import React, { Component } from "react";
import AdminEnrollCabinetLock from "./presenter";

class Container extends Component {
  state = {
    cabinet_id: null,
    lock_num: "",
    password: ""
  };

  async componentWillMount() {
    const { cabinets, getCabinetLockByCabId } = this.props;
    await this.setState({
      ...this.state,
      cabinet_id: cabinets[0].id
    });
    getCabinetLockByCabId(cabinets[0].id);
  }

  _onConfirmClick = async () => {
    const { addLock, sel_branch, temp_cabinet } = this.props;
    if (temp_cabinet.length) {
      alert("해당 사물함에는 자물쇠가 이미 있습니다");
    } else {
      addLock(
        sel_branch.id,
        this.state.cabinet_id,
        this.state.lock_num,
        this.state.password
      );
    }
  };

  _onCabinetNumChange = async e => {
    const { getCabinetLockByCabId } = this.props;

    await this.setState({
      ...this.state,
      cabinet_id: e.target.value
    });

    getCabinetLockByCabId(this.state.cabinet_id);
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
    const { sel_branch, cabinets } = this.props;
    return (
      <AdminEnrollCabinetLock
        onConfirmClick={this._onConfirmClick}
        sel_branch={sel_branch}
        onCabinetNumChange={this._onCabinetNumChange}
        onLockNumChange={this._onLockNumChange}
        onPasswordChange={this._onPasswordChange}
        cabinet_id={this.state.cabinet_id}
        lock_num={this.state.lock_num}
        password={this.state.password}
        cabinets={cabinets}
      />
    );
  }
}
export default Container;
