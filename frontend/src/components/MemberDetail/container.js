import React, { Component } from "react";
import MemberDetail from "./presenter";
import moment from "moment";

class Container extends Component {
  state = { loading: true };

  componentDidMount() {
    const {
      now_view_user,
      fetchNowViewMemberSeatHistory,
      now_view_member_seat_logs
    } = this.props;
    if (now_view_user) {
      if (now_view_member_seat_logs) {
        this.setState({
          ...this.state,
          loading: false
        });
      } else {
        fetchNowViewMemberSeatHistory(now_view_user.id);
      }
    }
  }
  componentWillReceiveProps() {
    const {
      now_view_user,
      now_view_member_seat_logs,
      fetchNowViewMemberSeatHistory
    } = this.props;
    if (now_view_user) {
      if (now_view_member_seat_logs) {
        this.setState({
          ...this.state,
          loading: false
        });
      } else {
        fetchNowViewMemberSeatHistory(now_view_user.id);
      }
    }
  }

  render() {
    const {
      now_view_user,
      detail_view_loading,
      seeing_regist_window,
      seeing_cabinet_regist_window,
      setSeeingRegistWindowFalse,
      setSeeingCabinetRegistWindowFalse,
      now_view_member_seat_logs
    } = this.props;
    const now_view_user_memberships = now_view_user
      ? now_view_user.memberships.filter(
          membership =>
            moment(membership.end_date).valueOf() > moment().valueOf() &&
            membership.is_usable
        )
      : "";

    const now_view_user_membership_logs = now_view_user
      ? Array.from(now_view_user.memberships, membership => {
          const log = membership.membership_historys[0];
          log.start_date = membership.start_date;
          log.end_date = membership.end_date;
          log.branch = membership.branch;

          return log;
        })
      : "";

    const now_view_member_cabinets = now_view_user
      ? now_view_user.cabinets.filter(
          cabinet =>
            moment(cabinet.end_date).valueOf() > moment().valueOf() &&
            !cabinet.is_clean
        )
      : "";

    const cabinet_historys = now_view_user
      ? now_view_user.cabinet_historys
      : "";
    return (
      <MemberDetail
        loading={this.state.loading}
        now_view_user={now_view_user}
        now_view_user_memberships={now_view_user_memberships}
        now_view_user_membership_logs={now_view_user_membership_logs}
        now_view_member_cabinets={now_view_member_cabinets}
        cabinet_historys={cabinet_historys}
        detail_view_loading={detail_view_loading}
        seeing_regist_window={seeing_regist_window}
        seeing_cabinet_regist_window={seeing_cabinet_regist_window}
        setSeeingRegistWindowFalse={setSeeingRegistWindowFalse}
        setSeeingCabinetRegistWindowFalse={setSeeingCabinetRegistWindowFalse}
        now_view_member_seat_logs={now_view_member_seat_logs}
      />
    );
  }
}
export default Container;
