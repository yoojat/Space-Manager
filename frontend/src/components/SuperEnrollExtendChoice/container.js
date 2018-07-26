import React, { Component } from "react";
import SuperEnrollExtendChoice from "./presenter";

class Container extends Component {
  state = {
    is_enroll: false,
    is_extend: false
  };

  _setIsEnrollTrue = () => {
    this.setState({
      ...this.state,
      is_enroll: true
    });
  };

  _setIsExtendTrue = () => {
    this.setState({
      ...this.state,
      is_extend: true
    });
  };

  render() {
    return (
      <SuperEnrollExtendChoice
        is_enroll={this.state.is_enroll}
        setIsEnrollTrue={this._setIsEnrollTrue}
        is_extend={this.state.is_extend}
        setIsExtendTrue={this._setIsExtendTrue}
      />
    );
  }
}
export default Container;
