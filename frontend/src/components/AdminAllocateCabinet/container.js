import React, { Component } from "react";
import AdminAllocateCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {
    keyword: "",
    scope: "name",
    set_datetime_show: false,
    confirm_show: false
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.confirm_show) {
      if (this.props.sel_end_datetime) {
        if (this.props.sel_end_datetime !== nextProps.sel_end_datetime) {
          this.setState({
            ...this.state,
            confirm_show: true
          });
        }
      }
    }
  }

  componentWillMount() {
    const {
      setStartDatetimeStaffCabinet,
      setEndDatetimeStaffCabinet
    } = this.props;
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    setStartDatetimeStaffCabinet(now);
    setEndDatetimeStaffCabinet(now);
  }

  _handleSelectChange = e => {
    this.setState({
      ...this.state,
      scope: e.target.value
    });
  };

  _handleChange = event => {
    this.setState({
      ...this.state,
      keyword: event.target.value
    });
  };

  _handleSubmit = event => {
    const { fetchSearchedMembers } = this.props;
    fetchSearchedMembers(this.state.keyword, this.state.scope);
    event.preventDefault();
  };

  _onMemberClick = user_id => {
    const { getUserForAllocate } = this.props;
    getUserForAllocate(user_id);
    this.setState({
      ...this.state,
      set_datetime_show: true
    });
  };

  _onStartDatetimeChange = e => {
    const { setStartDatetimeStaffCabinet } = this.props;
    setStartDatetimeStaffCabinet(e.format("YYYY-MM-DD HH:mm:ss"));
  };

  _onEndDatetimeChange = e => {
    const { setEndDatetimeStaffCabinet } = this.props;
    setEndDatetimeStaffCabinet(e.format("YYYY-MM-DD HH:mm:ss"));
  };

  componentWillUnmount() {
    const { setSearchMembersNullStaffCabinet } = this.props;
    setSearchMembersNullStaffCabinet();
  }

  _onConfirmButtonClick = async () => {
    const {
      enrollCabinet,
      sel_cabinet,
      sel_start_datetime,
      sel_end_datetime,
      sel_user,
      setInitAfterRegist,
      setWindowShowFalse,
      fetchSelCabinet,
      sel_cabinet_set,
      fetchSelCabinetSet,
      getCabinetDetail
    } = this.props;
    const cabinets = [sel_cabinet];

    //사물함 등록(로그 기록까지))
    await enrollCabinet(
      cabinets,
      sel_start_datetime,
      sel_end_datetime,
      sel_user.id
    );

    setInitAfterRegist();

    setWindowShowFalse();
    // 사물함세트정보다시 불러오기

    await fetchSelCabinetSet(sel_cabinet_set.id);
    // 사물함 정보 불러오기

    await fetchSelCabinet(sel_cabinet.id);

    await getCabinetDetail(sel_cabinet.id);
  };

  render() {
    const {
      searched_members,
      sel_start_datetime,
      sel_end_datetime,
      setEndDatetimeStaffCabinet,
      setStartDatetimeStaffCabinet
    } = this.props;
    return (
      <AdminAllocateCabinet
        handleChange={this._handleChange}
        handleSubmit={this._handleSubmit}
        keyword={this.state.keyword}
        searched_members={searched_members}
        onMemberClick={this._onMemberClick}
        confirm_show={this.state.confirm_show}
        handleSelectChange={this._handleSelectChange}
        scope={this.state.scope}
        set_datetime_show={this.state.set_datetime_show}
        onStartDatetimeChange={this._onStartDatetimeChange}
        onEndDatetimeChange={this._onEndDatetimeChange}
        sel_start_datetime={sel_start_datetime}
        sel_end_datetime={sel_end_datetime}
        setEndDatetimeStaffCabinet={setEndDatetimeStaffCabinet}
        setStartDatetimeStaffCabinet={setStartDatetimeStaffCabinet}
        onConfirmButtonClick={this._onConfirmButtonClick}
      />
    );
  }
}
export default Container;
