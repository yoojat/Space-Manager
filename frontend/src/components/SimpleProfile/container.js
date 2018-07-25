import React, { Component } from "react";
import SimpleProfile from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  render() {
    const { now_view_user } = this.props;
    const now_day_value = moment().valueOf();
    const now_membership = now_view_user.memberships.find(membership => {
      return (
        moment(membership.start_date).valueOf() <= now_day_value &&
        moment(membership.end_date).valueOf() >= now_day_value &&
        membership.is_usable
      );
    });
    return (
      <SimpleProfile
        now_view_user={now_view_user}
        now_membership={now_membership}
        now_membership_end_date={
          now_membership
            ? moment(now_membership.end_date).format("YYYY-MM-DD HH:mm:ss")
            : ""
        }
        now_user_created_at={moment(now_view_user.created_at).format(
          "YYYY-MM-DD HH:mm:ss"
        )}
      />
    );
  }
}
export default Container;
