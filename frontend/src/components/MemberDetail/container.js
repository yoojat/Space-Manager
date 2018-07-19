import React, { Component } from "react";
import MemberDetail from "./presenter";

class Container extends Component {
  state = { loading: true };

  componentWillMount() {
    const { fetchNowViewMemberships, now_view_user } = this.props;
    fetchNowViewMemberships(now_view_user.id);
  }

  componentDidMount() {
    const { now_view_member_memberships } = this.props;
    if (now_view_member_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { now_view_member_memberships } = nextProps;
    if (now_view_member_memberships) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { now_view_member_memberships } = this.props;
    return (
      <MemberDetail
        loading={this.state.loading}
        now_view_member_memberships={now_view_member_memberships}
      />
    );
  }
}
export default Container;
