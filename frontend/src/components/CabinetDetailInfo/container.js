import React, { Component } from "react";
import CabinetDetailInfo from "./presenter";
import AdminAllocateCabinet from "components/AdminAllocateCabinet";
import AdminExtendCabinet from "components/AdminExtendCabinet";
import AdminExpireCabinet from "components/AdminExpireCabinet";
import AdminCleanCabinet from "components/AdminCleanCabinet";
import AdminShiftCabinet from "components/AdminShiftCabinet";
import AdminModifyCabinet from "components/AdminModifyCabinet";

class Container extends Component {
  state = {
    loading: true,
    window_content: null,
    window_title: null
  };

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

  _onEnrollBtnClick = async () => {
    await this.setState({
      ...this.state,
      window_content: <AdminAllocateCabinet />,
      window_title: "사물함 등록"
    });
    await this._setWindowShowTrue();
  };

  _onExtendBtnClick = async () => {
    const { sel_cabinet } = this.props;
    await this.setState({
      ...this.state,
      window_content: <AdminExtendCabinet sel_cabinet={sel_cabinet} />,
      window_title: "사물함 연장"
    });
    await this._setWindowShowTrue();
  };

  _onExpireBtnClick = async () => {
    const { sel_cabinet } = this.props;
    await this.setState({
      ...this.state,
      window_content: <AdminExpireCabinet sel_cabinet={sel_cabinet} />,
      window_title: "사물함 만료"
    });
    this._setWindowShowTrue();
  };

  _onCleanBtnClick = async () => {
    const { sel_cabinet } = this.props;
    await this.setState({
      ...this.state,
      window_content: <AdminCleanCabinet sel_cabinet={sel_cabinet} />,
      window_title: "사물함 정리"
    });
    this._setWindowShowTrue();
  };

  _onShiftBtnClick = async () => {
    const { sel_cabinet } = this.props;
    await this.setState({
      ...this.state,
      window_content: <AdminShiftCabinet sel_cabinet={sel_cabinet} />,
      window_title: "사물함 이동"
    });
    this._setWindowShowTrue();
  };

  _onModifyBtnClick = async () => {
    const { sel_cabinet } = this.props;

    await this.setState({
      ...this.state,
      window_content: <AdminModifyCabinet sel_cabinet={sel_cabinet} />,
      window_title: "사물함 기간 수정"
    });
    this._setWindowShowTrue();
  };

  _close_func = () => {
    const { setWindowShowFalse } = this.props;
    this.setState({
      ...this.state,
      window_content: null,
      window_title: null
    });
    setWindowShowFalse();
  };

  _setWindowShowTrue = () => {
    const { setWindowShowTrue } = this.props;
    setWindowShowTrue();
  };
  render() {
    const { sel_cabinet, sel_cabinet_detail, window_show } = this.props;

    return (
      <CabinetDetailInfo
        sel_cabinet={sel_cabinet}
        loading={this.state.loading}
        sel_cabinet_detail={sel_cabinet_detail}
        onEnrollBtnClick={this._onEnrollBtnClick}
        onExtendBtnClick={this._onExtendBtnClick}
        onExpireBtnClick={this._onExpireBtnClick}
        onCleanBtnClick={this._onCleanBtnClick}
        onShiftBtnClick={this._onShiftBtnClick}
        onModifyBtnClick={this._onModifyBtnClick}
        close_func={this._close_func}
        window_show={window_show}
        window_content={this.state.window_content}
        window_title={this.state.window_title}
      />
    );
  }
}
export default Container;
