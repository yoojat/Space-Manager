import React, { Component } from "react";
import MemberAdmin from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { fetchTodayMemberships } = this.props;
    fetchTodayMemberships();
  }

  componentDidMount() {
    const { memberships_by_date } = this.props;
    if (memberships_by_date) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { memberships_by_date } = nextProps;
    if (memberships_by_date) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { memberships_by_date, now_view_user, show_detail_view } = this.props;
    return (
      <MemberAdmin
        loading={this.state.loading}
        memberships_by_date={memberships_by_date}
        now_view_user={now_view_user}
        show_detail_view={show_detail_view}
      />
    );
  }
}
export default Container;
