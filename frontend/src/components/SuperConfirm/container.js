import React, { Component, Fragment } from "react";
import SuperConfirm from "./presenter";
// import moment from "moment";

class Container extends Component {
  state = {};

  _onConfirmClick = async () => {
    const {
      enrollProcessing,
      setSeeingRegistWindowFalse,
      setSeeingCabinetRegistWindowFalse
    } = this.props;
    await enrollProcessing();
    await setSeeingRegistWindowFalse();
    await setSeeingCabinetRegistWindowFalse();
  };
  render() {
    return (
      <Fragment>
        <SuperConfirm onConfirmClick={this._onConfirmClick} />
      </Fragment>
    );
  }
}
export default Container;
