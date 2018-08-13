import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import moment from "moment";
import Datetime from "react-datetime";
import datetime_styles from "react-datetime/css/react-datetime.css";
import styles from "./styles.scss";
import Loading from "components/Loading";

const AdminExtendCabinet = (props, context) => {
  const {
    sel_cabinet,
    loading,
    onDatetimeChange,
    onAddButtonClick,
    end_datetime,
    onConfirmButtonClick
  } = props;

  // let moment = require("moment");
  require("moment/locale/ko");

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <InfoContainer>
        <NameRow>{sel_cabinet.user.name}</NameRow>
        <InfoContent>
          <InfoItem>{sel_cabinet.cabinet_set.branch.branch_name}</InfoItem>
          <InfoItem>{sel_cabinet.cabinet_number}번 사물함</InfoItem>
          <InfoItem>
            시작 :{" "}
            {moment(sel_cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")}
          </InfoItem>
          <InfoItem>
            종료 : {moment(sel_cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")}
          </InfoItem>
        </InfoContent>
      </InfoContainer>

      <SelDatetimeContainer>
        <SelDatetimeTitleCon>
          <SelDatetimeTitle>이용종료 일시를 선택해주세요!</SelDatetimeTitle>
          <SelDatetimeContentCon>
            <SelDatetimeContent>
              <Datetime
                className={`${datetime_styles.rdt} ${styles.datetime}`}
                value={moment(end_datetime)}
                dateFormat="YYYY MMMM Do"
                timeFormat="A hh:mm"
                onChange={e => {
                  onDatetimeChange(e);
                }}
                closeOnSelect={true}
              />
            </SelDatetimeContent>
          </SelDatetimeContentCon>
        </SelDatetimeTitleCon>
      </SelDatetimeContainer>
      <ButtonContainer>
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="+30일"
          hours={30 * 24}
        />
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="+15일"
          hours={15 * 24}
        />
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="+1일"
          hours={1 * 24}
        />
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="+16시간"
          hours={16}
        />
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="+1시간"
          hours={1}
        />
        <DatetimeAddButton
          onAddButtonClick={onAddButtonClick}
          title="초기화"
          hours={0}
        />
      </ButtonContainer>
      <ConfirmButtonContainer>
        <ConfirmButton onClick={onConfirmButtonClick}>등록</ConfirmButton>
      </ConfirmButtonContainer>
    </React.Fragment>
  );
};

const DatetimeAddButton = (props, context) => {
  const { title, hours, onAddButtonClick } = props;
  return (
    <Button
      onClick={() => {
        onAddButtonClick(hours);
      }}
    >
      {title}
    </Button>
  );
};

const InfoContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 20px 30px;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
`;
const NameRow = styled.div``;
const InfoContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 15px;
`;
const InfoItem = styled.div`
margin-top: 5px;
margin-bottom: 5px;
flex-basis: 200px;
font-size: 14px;
}`;
const SelDatetimeContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  margin-bottom: 15px;
`;
const SelDatetimeTitleCon = styled.div``;
const SelDatetimeTitle = styled.div`
  text-align: center;
`;
const SelDatetimeContentCon = styled.div``;
const SelDatetimeContent = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
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
  text-align: center;
  margin-bottom: 20px;
`;
const ConfirmButton = styled.button`
  width: 66px;
  height: 100%;
  background: #1e3799;
  color: #fff;
  border: none;
  position: relative;
  font-size: 14px;
  padding: 6px 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
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

AdminExtendCabinet.propTypes = {};

AdminExtendCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminExtendCabinet;
