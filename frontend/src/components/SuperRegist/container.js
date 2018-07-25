import React, { Component } from "react";
import SuperRegist from "./presenter";

class Container extends Component {
  state = {};

  render() {
    const {
      match: {
        params: { what_regist }
      }
    } = this.props;
    return <SuperRegist what_regist={what_regist} />;
  }
}
export default Container;
