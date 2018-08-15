import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "components/Loading";
import BranchChoiceForShiftCabinet from "components/BranchChoiceForShiftCabinet";
import SelectCabinetForShiftCabinet from "components/SelectCabinetForShiftCabinet";
import AdminShiftCabinetConfirm from "components/AdminShiftCabinetConfirm";
// import breakpoint from "styled-components-breakpoint";
// import moment from "moment";

const AdminShiftCabinet = (props, context) => {
  const { loading, sel_branch, target_cabinet } = props;
  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <BranchChoiceForShiftCabinet />
      {sel_branch ? <SelectCabinetForShiftCabinet /> : ""}
      {target_cabinet ? <AdminShiftCabinetConfirm /> : ""}
    </React.Fragment>
  );
};

AdminShiftCabinet.propTypes = {};

AdminShiftCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminShiftCabinet;
