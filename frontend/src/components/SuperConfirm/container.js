import React, { Component, Fragment } from "react";
import SuperConfirm from "./presenter";
// import moment from "moment";

class Container extends Component {
  state = {};

  _onConfirmClick = () => {
    const { enrollProcessing } = this.props;
    enrollProcessing();
  };
  render() {
    return (
      <Fragment>
        <SuperConfirm />
      </Fragment>
    );
  }
}
export default Container;
