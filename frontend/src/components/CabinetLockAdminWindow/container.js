import React, { Component } from "react";
import CabinetLockAdminWindow from "./presenter";

class Container extends Component {
  state = { loading: true };

  _closeWindow = () => {
    const { setModalWindowShowFalse } = this.props;
    setModalWindowShowFalse();
  };

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

  render() {
    const { content, title } = this.props;

    return (
      <CabinetLockAdminWindow
        closeWindow={this._closeWindow}
        content={content}
        title={title}
        loading={this.state.loading}
      />
    );
  }
}
export default Container;
