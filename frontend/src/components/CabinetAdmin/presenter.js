import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BranchChoiceForCabinetStaff from "components/BranchChoiceForCabinetStaff";
import SelectCabinetForCabinetStaff from "components/SelectCabinetForCabinetStaff";
import CabinetDetailInfo from "components/CabinetDetailInfo";

const CabinetAdmin = (props, context) => {
  const { sel_branch, sel_cabinet } = props;
  return (
    <MainContainer>
      <BranchChoiceForCabinetStaff />
      {sel_branch ? <SelectCabinetForCabinetStaff /> : ""}
      {sel_cabinet ? <CabinetDetailInfo /> : ""}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  margin-top: 20px;
  background-color: white;
  border: 1px solid #dedede;
  padding: 10px;
  box-shadow: 5px 10px 8px #dddddd;
  border-radius: 5px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

CabinetAdmin.propTypes = {};

CabinetAdmin.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetAdmin;
