import React, { Component } from "react";
import AdminExpireCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { sel_cabinet, setCabinetForStaffExpireCabinet } = this.props;

    setCabinetForStaffExpireCabinet(sel_cabinet);
  }

  componentDidMount() {
    const { sel_cabinet_for_expire } = this.props;
    if (sel_cabinet_for_expire) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_for_expire } = nextProps;
    if (sel_cabinet_for_expire) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  _onYesClick = async () => {
    const {
      expireCabinet,
      setWindowShowFalse,
      fetchSelCabinetSet,
      sel_cabinet_set
    } = this.props;
    await expireCabinet();
    setTimeout(() => {
      fetchSelCabinetSet(sel_cabinet_set.id);
    }, 2000);

    // 사물함 정보 불러오기
    setWindowShowFalse();
  };

  _onNoClick = () => {
    const { setWindowShowFalse } = this.props;

    setWindowShowFalse();
  };

  render() {
    return (
      <AdminExpireCabinet
        onNoClick={this._onNoClick}
        onYesClick={this._onYesClick}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
