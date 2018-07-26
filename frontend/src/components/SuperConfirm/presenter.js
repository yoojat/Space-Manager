import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SuperConfirm = (props, context) => {
  const { onConfirmClick } = props;

  return (
    <ButtonContainer>
      <Button color="#374bab" onClick={onConfirmClick}>
        등록하기
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;

const Button = styled.button`
  border-radius: 30px;
  border: none;
  padding: 5px 15px;
  margin: 5px;
  color: white;
  background-color: ${props => props.color};
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

SuperConfirm.propTypes = {};

SuperConfirm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SuperConfirm;
