import React, { Component } from "react";
import RegistWindow from "./presenter";

class Container extends Component {
  state = {
    loading: false
  };

  render() {
    const { content, closeRegistWindow } = this.props;
    return (
      <RegistWindow
        content={content}
        loading={this.state.loading}
        closeRegistWindow={closeRegistWindow}
      />
    );
  }
}

export default Container;
