import React, { Component } from "react";
import CabinetSet from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {};

  _cabinetSetClickHandler = () => {
    const { id, fetchCabinetSet } = this.props;
    fetchCabinetSet(id);
  };
  render() {
    const { cabinet_set, sel_cabinet_set, id } = this.props;
    return (
      <CabinetSet
        cabinet_set={cabinet_set}
        cabinetSetClickHandler={this._cabinetSetClickHandler}
        sel_cabinet_set={sel_cabinet_set}
        id={id}
      />
    );
  }
}

Container.propTypes = {
  cabinet_set: PropTypes.object.isRequired,
  fetchCabinetSet: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  sel_cabinet_set: PropTypes.object
};

export default Container;
