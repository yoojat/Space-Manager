import React, { Component } from "react";
import CabinetDetailInfo from "./presenter";

class Container extends Component {
  state = { loading: true, window_show: false };

  componentWillMount() {
    const { sel_cabinet, getCabinetDetail } = this.props;
    getCabinetDetail(sel_cabinet.id);
  }

  componentWillUpdate(nextProps, nextState) {
    const { getCabinetDetail } = nextProps;
    if (this.props.sel_cabinet.id !== nextProps.sel_cabinet.id) {
      getCabinetDetail(nextProps.sel_cabinet.id);
    }
  }

  componentDidMount() {
    const { sel_cabinet_detail } = this.props;
    if (sel_cabinet_detail) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_detail } = nextProps;
    if (sel_cabinet_detail) {
      this.setState({
        ...this.state,
        loading: false
      });
    } else {
      this.setState({
        ...this.state,
        loading: true
      });
    }
  }

  _onEnrollBtnClick = () => {
    this._setWindowShowTrue();
    console.log("erollBtnClick");
  };

  _onExtendBtnClick = () => {
    this._setWindowShowTrue();

    console.log("onExtendBtnClick");
  };

  _onExpireBtnClick = () => {
    this._setWindowShowTrue();

    console.log("onExpireBtnClick");
  };

  _onCleanBtnClick = () => {
    this._setWindowShowTrue();

    console.log("onCleanBtnClick");
  };

  _onMoveBtnClick = () => {
    this._setWindowShowTrue();

    console.log("onMoveClick");
  };

  _onModifyBtnClick = () => {
    this._setWindowShowTrue();

    console.log("onModifyClick");
  };

  _setWindowShowFalse = () => {
    this.setState({
      ...this.state,
      window_show: false
    });
  };

  _setWindowShowTrue = () => {
    this.setState({
      ...this.state,
      window_show: true
    });
  };
  render() {
    const { sel_cabinet, sel_cabinet_detail } = this.props;
    return (
      <CabinetDetailInfo
        sel_cabinet={sel_cabinet}
        loading={this.state.loading}
        sel_cabinet_detail={sel_cabinet_detail}
        onEnrollBtnClick={this._onEnrollBtnClick}
        onExtendBtnClick={this._onExtendBtnClick}
        onExpireBtnClick={this._onExpireBtnClick}
        onCleanBtnClick={this._onCleanBtnClick}
        onMoveBtnClick={this._onMoveBtnClick}
        onModifyBtnClick={this._onModifyBtnClick}
        setWindowShowFalse={this._setWindowShowFalse}
        window_show={this.state.window_show}
      />
    );
  }
}
export default Container;
