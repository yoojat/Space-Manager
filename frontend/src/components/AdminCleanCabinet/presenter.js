import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "components/Loading";
// import breakpoint from "styled-components-breakpoint";
// import moment from "moment";

const AdminCleanCabinet = (props, context) => {
  const { onNoClick, onYesClick, loading } = props;
  return loading ? (
    <Loading />
  ) : (
    <ExpireCabinetContainer>
      <InfoContainer>
        <Info>
          사물함 안에 짐이 없는지 확인해주세요!
          <br />
          해당 사물함을 정리 완료 상태로 변경하시겠습니까?
        </Info>
      </InfoContainer>
      <ButtonCotainer>
        <Button onClick={onYesClick}>예</Button>
        <Button onClick={onNoClick}>아니오</Button>
      </ButtonCotainer>
    </ExpireCabinetContainer>
  );
};

const ExpireCabinetContainer = styled.div`
  margin-top: 55px;
`;
const InfoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
`;
const Info = styled.div``;
const ButtonCotainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Button = styled.button`
  width: 80px;
  height: 100%;
  background: #1b9cfc;
  color: #fff;
  border: none;
  position: relative;
  font-size: 11px;
  padding: 8px 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 2px;
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

AdminCleanCabinet.propTypes = {};

AdminCleanCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminCleanCabinet;
