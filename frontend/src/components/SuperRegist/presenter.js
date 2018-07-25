import React from "react";
import PropTypes from "prop-types";
import SuperMembership from "components/SuperMembership";
import SuperCabinet from "components/SuperCabinet";

const SuperRegist = (props, context) => {
  const { what_regist } = props;

  return what_regist === "membership" ? (
    <SuperMembership />
  ) : what_regist === "cabinet" ? (
    <SuperCabinet />
  ) : (
    ""
  );
};

SuperRegist.propTypes = {};

SuperRegist.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperRegist;
