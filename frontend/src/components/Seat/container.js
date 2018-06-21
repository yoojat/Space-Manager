import React, { Component } from "react";
import Seat from "./presenter";

class Container extends Component {
  state = {
    loading: false
  };

  _onSeatClick = () => {
    this.setState({ ...this.state, loading: true });
    this.props.handleSeatClick();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.now_using !== this.props.now_using) {
      this.setState({ ...this.state, loading: false });
    }
  }
  render() {
    return (
      <Seat
        {...this.props}
        loading={this.state.loading}
        onSeatClick={this._onSeatClick}
      />
    );
  }
}

export default Container;
