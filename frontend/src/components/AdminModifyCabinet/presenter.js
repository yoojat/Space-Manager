import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "components/Loading";
import Datetime from "react-datetime";
import datetime_styles from "react-datetime/css/react-datetime.css";
import styles from "./styles.scss";
// import breakpoint from "styled-components-breakpoint";
import moment from "moment";

const AdminModifyCabinet = (props, context) => {
  const {
    loading,
    sel_start_datetime,
    sel_end_datetime,
    addStartDatetime,
    initStartDatetime,
    addEndDatetime,
    setStartDatetime,
    setEndDatetime,
    initEndDatetime,
    onConfirmClick
  } = props;
  require("moment/locale/ko");

  return loading ? (
    <Loading />
  ) : (
    <ConatinerModify>
      <ModifyRow>
        <Title>시작일시</Title>
        <DateDisplay>
          <Datetime
            className={`${datetime_styles.rdt} ${styles.datetime}`}
            value={moment(sel_start_datetime)}
            dateFormat="YYYY MMMM Do"
            timeFormat="A hh:mm"
            onChange={e => {
              setStartDatetime(e);
            }}
            closeOnSelect={true}
          />
        </DateDisplay>
        <ButtonContainer>
          <Button
            onClick={() => {
              addStartDatetime(30, "d");
            }}
          >
            +30일
          </Button>
          <Button
            onClick={() => {
              addStartDatetime(15, "d");
            }}
          >
            +15일
          </Button>
          <Button
            onClick={() => {
              addStartDatetime(1, "d");
            }}
          >
            +1일
          </Button>
          <Button
            onClick={() => {
              addStartDatetime(16, "h");
            }}
          >
            +16시간
          </Button>
          <Button
            onClick={() => {
              addStartDatetime(1, "h");
            }}
          >
            +1시간
          </Button>
          <Button onClick={initStartDatetime}>초기화</Button>
        </ButtonContainer>
      </ModifyRow>
      <ModifyRow>
        <Title>종료일시</Title>
        <DateDisplay>
          <Datetime
            className={`${datetime_styles.rdt} ${styles.datetime}`}
            value={moment(sel_end_datetime)}
            dateFormat="YYYY MMMM Do"
            timeFormat="A hh:mm"
            onChange={e => {
              setEndDatetime(e);
            }}
            closeOnSelect={true}
          />
        </DateDisplay>
        <ButtonContainer>
          <Button
            onClick={() => {
              addEndDatetime(30, "d");
            }}
          >
            +30일
          </Button>
          <Button
            onClick={() => {
              addEndDatetime(15, "d");
            }}
          >
            +15일
          </Button>
          <Button
            onClick={() => {
              addEndDatetime(1, "d");
            }}
          >
            +1일
          </Button>
          <Button
            onClick={() => {
              addEndDatetime(16, "h");
            }}
          >
            +16시간
          </Button>
          <Button
            onClick={() => {
              addEndDatetime(1, "h");
            }}
          >
            +1시간
          </Button>
          <Button onClick={initEndDatetime}>초기화</Button>
        </ButtonContainer>
      </ModifyRow>
      <ModifyRow>
        <ConfirmButtonContainer>
          <ConfirmButton onClick={onConfirmClick}>수정하기</ConfirmButton>
        </ConfirmButtonContainer>
      </ModifyRow>
    </ConatinerModify>
  );
};

const ConatinerModify = styled.div`
  padding: 25px;
`;
const ModifyRow = styled.div`
  &:nth-child(2) {
    margin-top: 20px;
  }
`;
const Title = styled.div``;
const DateDisplay = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  border: none;
  color: #ffffff;
  padding: 4px 8px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  margin: 3px 1px !important;
  text-decoration: none;
  font-size: 11px;
  cursor: pointer;
  background-color: #00a8ff;
  border-radius: 3px;
  &:hover {
    background-color: #273c75;
  }
`;
const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
`;

const ConfirmButton = styled.button`
  width: 90px;
  height: 100%;
  background: #4834d4;
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

AdminModifyCabinet.propTypes = {};

AdminModifyCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminModifyCabinet;
