import React, { Component } from "react";
import MiniMapSuperSeat from "./presenter";

class Container extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.now_user === nextProps.now_user) {
      if (this.props.now_using !== nextProps.now_using) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  render() {
    return <MiniMapSuperSeat {...this.props} />;
  }
}

export default Container;
