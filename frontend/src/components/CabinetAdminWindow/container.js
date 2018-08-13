import React, { Component } from "react";
import CabinetAdminWindow from "./presenter";

class Container extends Component {
  state = {};

  componentDidMount() {
    const { content, title } = this.props;
    if (content && title) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { content, title } = nextProps;
    if (content && title) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  _closeWindow = () => {
    const { close_func } = this.props;
    close_func();
  };

  render() {
    const { content, title } = this.props;
    return (
      <CabinetAdminWindow
        closeWindow={this._closeWindow}
        content={content}
        title={title}
      />
    );
  }
}
export default Container;
