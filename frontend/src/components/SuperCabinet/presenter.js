import React from "react";
import PropTypes from "prop-types";

const SuperCabinet = (props, context) => {
  return <div>SuperCabinet</div>;
};

SuperCabinet.propTypes = {};

SuperCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperCabinet;
