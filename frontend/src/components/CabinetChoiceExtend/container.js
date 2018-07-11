import React, { Component } from "react";
import CabinetChoiceExtend from "./presenter";
import { scroller } from "react-scroll";

class Container extends Component {
  state = {};

  componentDidMount() {
    scroller.scrollTo("CabinetChoiceExtend", {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50
    });
  }

  render() {
    const { my_cabinets } = this.props;

    return <CabinetChoiceExtend my_cabinets={my_cabinets} />;
  }
}
export default Container;
