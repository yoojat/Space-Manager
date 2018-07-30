import React, { Component } from "react";
import MiniMapSuper from "./presenter";

class Container extends Component {
  render() {
    const { branch } = this.props;

    return <MiniMapSuper branch={branch} />;
  }
}

export default Container;
