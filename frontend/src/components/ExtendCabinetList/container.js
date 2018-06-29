import React, { Component } from "react";
import ExtendCabinetList from "./presenter";

class Container extends Component {
  state = {};

  _onCabinetClick = () => {
    const { my_cabinet, setCabinetExtend } = this.props;
    setCabinetExtend(my_cabinet);
    console.log(my_cabinet);
  };

  render() {
    const { my_cabinet, cabinets_extend } = this.props;
    return (
      <ExtendCabinetList
        onCabinetClick={this._onCabinetClick}
        my_cabinet={my_cabinet}
        cabinets_extend={cabinets_extend}
      />
    );
  }
}
export default Container;
