import React, { Component } from "react";
import MiniMap from "./presenter";

class Container extends Component {
  render() {
    return <MiniMap {...this.props} />;
  }
}

export default Container;
