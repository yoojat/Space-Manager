import React, { Component } from "react";
import RegistCabinet from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };

  render() {
    console.log(this.props);
    return <RegistCabinet loading={this.state.loading} />;
  }
}

export default Container;
