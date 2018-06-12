import React, { Component } from "react";
import ExtendCabinetList from "./presenter";

class Container extends Component {
  state = {};

  _onCabinetClick = () => {
    const { my_cabinet, setCabinetsToExtend } = this.props;
    setCabinetsToExtend(my_cabinet);
  };

  render() {
    const { my_cabinet, cabinets_to_extended } = this.props;
    return (
      <ExtendCabinetList
        onCabinetClick={this._onCabinetClick}
        my_cabinet={my_cabinet}
        cabinets_to_extended={cabinets_to_extended}
      />
    );
  }
}
export default Container;
