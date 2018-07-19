import React, { Component } from "react";
import MembershipsByDate from "./presenter";
import moment from "moment";

class Container extends Component {
  state = { select_date: moment() };

  _onDateChange = moment_value => {
    const { fetchMembershipsByDate } = this.props;
    fetchMembershipsByDate(moment_value.format("YYYY-MM-DD"));

    this.setState({
      ...this.state,
      select_date: moment_value
    });
  };

  _onMemberClick = userid => {
    const { fetchNowViewMember } = this.props;
    fetchNowViewMember(userid);
  };
  render() {
    const { memberships_by_date } = this.props;
    return (
      <MembershipsByDate
        memberships_by_date={memberships_by_date}
        select_date={this.state.select_date}
        onDateChange={this._onDateChange}
        onMemberClick={this._onMemberClick}
      />
    );
  }
}
export default Container;
