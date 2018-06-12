import React, { Component } from "react";
import ExtendCabinet from "./presenter";

class Container extends Component {
  state = {
    is_first: true
  };

  _onYesClick = () => {
    const { setWillExtendCabinet, will_extend_cabinet } = this.props;

    if (!will_extend_cabinet) {
      setWillExtendCabinet();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  _onNoClick = () => {
    const { setWillDontExtendCabinet, will_extend_cabinet } = this.props;

    if (will_extend_cabinet) {
      setWillDontExtendCabinet();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  render() {
    const { will_extend_cabinet, cabinets_to_extended } = this.props;

    return (
      <ExtendCabinet
        is_first={this.state.is_first}
        will_extend_cabinet={will_extend_cabinet}
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
        cabinets_to_extended={cabinets_to_extended}
      />
    );
  }
}
export default Container;
