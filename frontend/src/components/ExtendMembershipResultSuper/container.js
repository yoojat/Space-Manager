import React, { Component, Fragment } from "react";
import ExtendMembershipResultSuper from "./presenter";

class Container extends Component {
  state = {};
  componentWillMount() {
    const { setNowDatetime, fetchPaymethods } = this.props;
    setNowDatetime();
    fetchPaymethods();
  }

  render() {
    const {
      extendMembership,
      enrollCabinet,
      extendCabinet,
      now_datetime
    } = this.props;

    return (
      <Fragment>
        <ExtendMembershipResultSuper
          extendMembership={extendMembership}
          enrollCabinet={enrollCabinet}
          extendCabinet={extendCabinet}
          now_datetime={now_datetime}
        />
      </Fragment>
    );
  }
}
export default Container;
