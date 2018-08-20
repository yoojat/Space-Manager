import React, { Component } from "react";
import AdminModifyCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {
    loading: true,
    sel_start_datetime: null,
    sel_end_datetime: null
  };

  componentWillMount() {
    const { sel_cabinet, setCabinetForStaffModifyCabinet } = this.props;
    setCabinetForStaffModifyCabinet(sel_cabinet);
  }

  componentDidMount() {
    const { sel_cabinet_for_modify } = this.props;
    if (sel_cabinet_for_modify) {
      this.setState({
        ...this.state,
        loading: false,
        sel_start_datetime: sel_cabinet_for_modify.start_date,
        sel_end_datetime: sel_cabinet_for_modify.end_date
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sel_cabinet_for_modify } = nextProps;
    if (sel_cabinet_for_modify) {
      this.setState({
        ...this.state,
        loading: false,
        sel_start_datetime: sel_cabinet_for_modify.start_date,
        sel_end_datetime: sel_cabinet_for_modify.end_date
      });
    }
  }
  _initStartDatetime = () => {
    const { sel_cabinet_for_modify } = this.props;
    this.setState({
      ...this.state,
      sel_start_datetime: sel_cabinet_for_modify.start_date
    });
  };

  _initEndDatetime = () => {
    const { sel_cabinet_for_modify } = this.props;
    this.setState({
      ...this.state,
      sel_end_datetime: sel_cabinet_for_modify.end_date
    });
  };

  _addStartDatetime = (value, unit) => {
    const { sel_start_datetime } = this.state;
    const result = moment(sel_start_datetime)
      .add(value, unit)
      .format("YYYY-MM-DD HH:mm:ss");
    this.setState({
      ...this.state,
      sel_start_datetime: result
    });
  };

  _addEndDatetime = (value, unit) => {
    const { sel_end_datetime } = this.state;
    const result = moment(sel_end_datetime)
      .add(value, unit)
      .format("YYYY-MM-DD HH:mm:ss");
    this.setState({
      ...this.state,
      sel_end_datetime: result
    });
  };

  _setStartDatetime = moment_obj => {
    this.setState({
      ...this.state,
      sel_start_datetime: moment_obj.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  _setEndDatetime = moment_obj => {
    this.setState({
      ...this.state,
      sel_end_datetime: moment_obj.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  _onConfirmClick = () => {
    const { modifyCabinet, setWindowShowFalse } = this.props;
    setWindowShowFalse();
    modifyCabinet(this.state.sel_start_datetime, this.state.sel_end_datetime);
  };

  render() {
    const { sel_cabinet_for_modify } = this.props;
    return (
      <AdminModifyCabinet
        loading={this.state.loading}
        sel_cabinet_for_modify={sel_cabinet_for_modify}
        sel_start_datetime={this.state.sel_start_datetime}
        sel_end_datetime={this.state.sel_end_datetime}
        addStartDatetime={this._addStartDatetime}
        addEndDatetime={this._addEndDatetime}
        setStartDatetime={this._setStartDatetime}
        setEndDatetime={this._setEndDatetime}
        initStartDatetime={this._initStartDatetime}
        initEndDatetime={this._initEndDatetime}
        onConfirmClick={this._onConfirmClick}
      />
    );
  }
}
export default Container;
