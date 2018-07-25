import React, { Component, Fragment } from "react";
import SuperEnrollMembershipResult from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {};

  componentDidMount() {
    scroller.scrollTo("SuperEnrollMembershipResult", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

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
