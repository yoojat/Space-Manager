import React, { Component } from "react";
import AdminExtendCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const {
      setCabinetForStaffExtendCabinet,
      setExpireDatetimeForStaffExtendCabinet,
      sel_cabinet
    } = this.props;
    setCabinetForStaffExtendCabinet(sel_cabinet);
    setExpireDatetimeForStaffExtendCabinet(
      moment(sel_cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")
    );
  }

  componentDidMount() {
    const { sel_cabinet_for_extend, end_datetime } = this.props;
    if (sel_cabinet_for_extend && end_datetime) {
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_for_extend, end_datetime } = nextProps;
    if (sel_cabinet_for_extend && end_datetime) {
      this.setState({
        loading: false
      });
    }
  }

  _onDatetimeChange = momentObj => {
    const { setExpireDatetimeForStaffExtendCabinet } = this.props;
    setExpireDatetimeForStaffExtendCabinet(
      momentObj.format("YYYY-MM-DD HH:mm:ss")
    );
  };

  _onAddButtonClick = hours => {
    const {
      sel_cabinet_for_extend,
      end_datetime,
      setExpireDatetimeForStaffExtendCabinet
    } = this.props;
    if (hours === 0) {
      setExpireDatetimeForStaffExtendCabinet(sel_cabinet_for_extend.end_date);
    } else {
      const resultDatetime = moment(end_datetime)
        .add(hours, "h")
        .format("YYYY-MM-DD HH:mm:ss");
      setExpireDatetimeForStaffExtendCabinet(resultDatetime);
    }
  };

  _onConfirmButtonClick = () => {
    const { extendCabinet, setWindowShowFalse } = this.props;
    setWindowShowFalse();
    extendCabinet();
  };

  render() {
    const { sel_cabinet, end_datetime } = this.props;
    return (
      <AdminExtendCabinet
        sel_cabinet={sel_cabinet}
        loading={this.state.loading}
        onDatetimeChange={this._onDatetimeChange}
        onAddButtonClick={this._onAddButtonClick}
        end_datetime={end_datetime}
        onConfirmButtonClick={this._onConfirmButtonClick}
      />
    );
  }
}
export default Container;
