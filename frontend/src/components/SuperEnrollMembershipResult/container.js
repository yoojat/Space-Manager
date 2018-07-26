import React, { Component, Fragment } from "react";
import SuperEnrollMembershipResult from "./presenter";

class Container extends Component {
  state = {};

  componentWillMount() {
    const { setNowDatetime } = this.props;
    setNowDatetime();
  }

  render() {
    const {
      enrollMembership,
      enrollCabinet,
      extendCabinet,
      now_datetime
    } = this.props;

    return (
      <Fragment>
        <SuperEnrollMembershipResult
          enrollMembership={enrollMembership}
          enrollCabinet={enrollCabinet}
          extendCabinet={extendCabinet}
          now_datetime={now_datetime}
        />
      </Fragment>
    );
  }
}
export default Container;
