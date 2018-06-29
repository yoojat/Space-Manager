import React, { Component } from "react";
import ExtendCabinet from "./presenter";

class Container extends Component {
  state = {
    is_first: true
  };

  _onYesClick = () => {
    const { setIsExtendCabinetTrue, is_extend_cabinet } = this.props;

    if (!is_extend_cabinet) {
      setIsExtendCabinetTrue();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  _onNoClick = () => {
    const { setIsExtendCabinetFalse, is_extend_cabinet } = this.props;

    if (is_extend_cabinet) {
      setIsExtendCabinetFalse();
    }

    if (this.state.is_first) {
      this.setState({
        ...this.state,
        is_first: false
      });
    }
  };

  render() {
    const { is_extend_cabinet, cabinets_extend } = this.props;

    return (
      <ExtendCabinet
        is_first={this.state.is_first}
        is_extend_cabinet={is_extend_cabinet}
        onYesClick={this._onYesClick}
        onNoClick={this._onNoClick}
        cabinets_extend={cabinets_extend}
      />
    );
  }
}
export default Container;
