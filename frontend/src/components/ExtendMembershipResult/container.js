import React, { Component, Fragment } from "react";
import ExtendMembershipResult from "./presenter";
import { scroller } from "react-scroll";
import Script from "react-load-script";

class Container extends Component {
  state = {};
  componentWillMount() {
    const { setNowDatetime, fetchPaymethods } = this.props;
    setNowDatetime();
    fetchPaymethods();
  }

  componentDidMount() {
    scroller.scrollTo("ExtendMembershipResult", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
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
        <Script
          url="https://code.jquery.com/jquery-1.12.4.min.js"
          onLoad={this._handleJqueryLoad}
        />
        <Script
          url="https://service.iamport.kr/js/iamport.payment-1.1.5.js"
          onLoad={this._handleIamportLoad}
        />
        <ExtendMembershipResult
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
