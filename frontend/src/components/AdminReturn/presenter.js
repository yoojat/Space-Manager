import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styled from "styled-components";

const AdminReturn = (props, context) => {
  const {
    sel_user_for_seat_man,
    sel_seat_for_seat_man,
    loading,
    onYesClick,
    onNoClick
  } = props;
  return loading ? (
    <Loading />
  ) : (
    <ConfirmContainer>
      <ConfirmContent>
        <ConfirmTitle>
          <ConfirmTitleHeader>
            <div>좌석 반납</div>
          </ConfirmTitleHeader>
          <ConfirmTitleBody>
            <div>
              {sel_user_for_seat_man.name}님을{" "}
              {sel_seat_for_seat_man.seat_number}번자리에서 반납시키시겠습니까?
            </div>
          </ConfirmTitleBody>
        </ConfirmTitle>
        <ConfirmButtonContainer>
          <ConfirmButton onClick={onYesClick}>
            <div>예</div>
          </ConfirmButton>
          <ConfirmButton onClick={onNoClick}>
            <div>아니오</div>
          </ConfirmButton>
        </ConfirmButtonContainer>
      </ConfirmContent>
    </ConfirmContainer>
  );
};

const ConfirmContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const ConfirmContent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background-color: #ecf0f1;
  box-shadow: 5px 10px 8px #888888;
`;
const ConfirmTitle = styled.div``;
const ConfirmTitleHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmTitleBody = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmButtonContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmButton = styled.button`
  margin: 15px;
  width: 100px;
  height: 100%;
  background: #1b9cfc;
  color: #fff;
  border: none;
  position: relative;
  height: 21px;
  font-size: 11px;
  padding: 0 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
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

AdminReturn.propTypes = {};

AdminReturn.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminReturn;
