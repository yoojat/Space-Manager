import React, { Component } from "react";
import AdminCleanCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { sel_cabinet, setCabinetForStaffCleanCabinet } = this.props;

    setCabinetForStaffCleanCabinet(sel_cabinet);
  }

  componentDidMount() {
    const { sel_cabinet_for_clean } = this.props;
    if (sel_cabinet_for_clean) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_for_clean } = nextProps;
    if (sel_cabinet_for_clean) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  _onYesClick = async () => {
    const {
      cleanCabinet,
      setWindowShowFalse,
      fetchSelCabinetSet,
      sel_cabinet_set
    } = this.props;
    await cleanCabinet();
    setTimeout(() => {
      fetchSelCabinetSet(sel_cabinet_set.id);
    }, 1000);

    // 사물함 정보 불러오기
    setWindowShowFalse();
  };

  _onNoClick = () => {
    const { setWindowShowFalse } = this.props;

    setWindowShowFalse();
  };

  render() {
    return (
      <AdminCleanCabinet
        onNoClick={this._onNoClick}
        onYesClick={this._onYesClick}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
