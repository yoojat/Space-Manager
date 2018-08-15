import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AdminShiftCabinetConfirm = (props, context) => {
  const { onConfirmClick } = props;
  return (
    <ButtonContainer>
      <Button onClick={onConfirmClick}>해당 사물함으로 이동하기</Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  width: 150px;
  height: 100%;
  background: #1b9cfc;
  color: #fff;
  border: none;
  position: relative;
  font-size: 11px;
  padding: 7px 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 1px;
  &:hover {
    background: #fff;
    color: #1b9cfc;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #1b9cfc;
    transition: 400ms ease all;
  }
  &:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

AdminShiftCabinetConfirm.propTypes = {};

AdminShiftCabinetConfirm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminShiftCabinetConfirm;
