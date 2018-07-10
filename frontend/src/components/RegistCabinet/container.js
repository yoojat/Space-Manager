import React, { Component } from "react";
import RegistCabinet from "./presenter";
import moment from "moment";

class Container extends Component {
  state = {};

  render() {
    const { my_cabinets } = this.props;

    const expired_cabinet = my_cabinets.find(function(my_cabinet) {
      return moment(my_cabinet.end_date).valueOf() < moment().valueOf();
    });

    return <RegistCabinet my_cabinets={my_cabinets} />;
  }
}
export default Container;
