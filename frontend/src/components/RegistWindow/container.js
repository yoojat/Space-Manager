import React, { Component } from "react";
import RegistWindow from "./presenter";

class Container extends Component {
  state = {
    loading: false
  };

  _closeWindow = () => {
    const { close_func } = this.props;
    close_func();
  };

  render() {
    const { content, closeRegistWindow, title } = this.props;
    return (
      <RegistWindow
        content={content}
        loading={this.state.loading}
        closeRegistWindow={closeRegistWindow}
        title={title}
        close_func={this._closeWindow}
      />
    );
  }
}

export default Container;
