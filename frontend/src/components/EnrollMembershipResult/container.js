import React, { Component } from "react";
import EnrollMembershipResult from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {};

  componentDidMount() {
    scroller.scrollTo("EnrollMembershipResult", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  render() {
    const { enrollMembership, enrollCabinet } = this.props;

    return (
      <EnrollMembershipResult
        enrollMembership={enrollMembership}
        enrollCabinet={enrollCabinet}
      />
    );
  }
}
export default Container;
