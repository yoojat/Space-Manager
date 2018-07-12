import React, { Component } from "react";
import MiniMap from "./presenter";

class Container extends Component {
  render() {
    const { branch } = this.props;

    return <MiniMap branch={branch} />;
  }
}

export default Container;
