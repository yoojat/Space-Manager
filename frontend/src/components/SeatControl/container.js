import React, { Component } from "react";
import SeatControl from "./presenter";

class Container extends Component {
  state = {
    loading: true
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

  _closeWindow = () => {
    const { close_func } = this.props;
    close_func();
  };

  render() {
    const { content, title } = this.props;
    return (
      <SeatControl
        content={content}
        loading={this.state.loading}
        title={title}
        close_func={this._closeWindow}
      />
    );
  }
}

export default Container;
