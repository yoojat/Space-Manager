import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import moment from "moment";
import Datetime from "react-datetime";
import datetime_styles from "react-datetime/css/react-datetime.css";
import { Element } from "react-scroll";
import styles from "./styles.scss";

const AdminAllocateCabinet = (props, context) => {
  const {
    handleChange,
    handleSubmit,
    keyword,
    searched_members,
    onMemberClick,
    confirm_show,
    handleSelectChange,
    scope,
    set_datetime_show,
    onStartDatetimeChange,
    onEndDatetimeChange,
    sel_start_datetime,
    sel_end_datetime,
    setEndDatetimeStaffCabinet,
    onConfirmButtonClick,
    setStartDatetimeStaffCabinet
  } = props;

  // let moment = require("moment");
  require("moment/locale/ko");

  return (
    <AllocateBack>
      <AllocateContainer>
        <AllocateContent>
          <SearchFormSet
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSelectChange={handleSelectChange}
            keyword={keyword}
            scope={scope}
          />
        </AllocateContent>
        <AllocateContent>
          <SearchedTable>
            <TitleContainer>
              <Row>
                <Col>성별</Col>
                <Col>아이디</Col>
                <Col>생년월일</Col>
                <Col>이름</Col>
              </Row>
            </TitleContainer>
            <ContentContainer>
              {searched_members ? (
                searched_members.map(member => (
                  <MemberList
                    id={member.id}
                    gender={member.gender}
                    username={member.username}
                    birth={member.birth}
                    name={member.name}
                    key={member.id}
                    onMemberClick={onMemberClick}
                  />
                ))
              ) : (
                <div
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div>배정할 회원을 검색해주세요!</div>
                </div>
              )}
            </ContentContainer>
          </SearchedTable>
        </AllocateContent>
        {set_datetime_show ? (
          <React.Fragment>
            <AllocateContent>
              <Element name="startChoice">
                <SelWhenTitle>
                  {context.t("이용시작 일시를 선택해 주세요!")}
                </SelWhenTitle>
                <Datetime
                  className={`${datetime_styles.rdt} ${styles.datetime}`}
                  value={sel_start_datetime}
                  dateFormat="YYYY MMMM Do"
                  timeFormat="A hh:mm"
                  onChange={onStartDatetimeChange}
                  closeOnSelect={true}
                />
                <ButtonContainer>
                  <DesingedCalButton
                    onClick={() => {
                      setStartDatetimeStaffCabinet(
                        moment().format("YYYY-MM-DD HH:mm:ss")
                      );
                    }}
                  >
                    현재 시각
                  </DesingedCalButton>
                </ButtonContainer>
              </Element>
            </AllocateContent>
            <AllocateContent>
              <Element name="endChoice">
                <SelWhenTitle>
                  {context.t("이용종료 일시를 선택해 주세요!")}
                </SelWhenTitle>
                <Datetime
                  className={`${datetime_styles.rdt} ${styles.datetime}`}
                  value={sel_end_datetime}
                  dateFormat="YYYY MMMM Do"
                  timeFormat="A hh:mm"
                  onChange={onEndDatetimeChange}
                  closeOnSelect={true}
                />
              </Element>
              <ButtonContainer>
                <CalHourButton
                  addValues={30}
                  setFunc={setEndDatetimeStaffCabinet}
                  targetDatetime={sel_end_datetime}
                  name="+30일"
                />
                <CalHourButton
                  addValues={15}
                  setFunc={setEndDatetimeStaffCabinet}
                  targetDatetime={sel_end_datetime}
                  name="+15일"
                />
                <CalHourButton
                  addValues={1}
                  setFunc={setEndDatetimeStaffCabinet}
                  targetDatetime={sel_end_datetime}
                  name="+1일"
                />
                <CalHourButton
                  addValues={0.666666666666667}
                  setFunc={setEndDatetimeStaffCabinet}
                  targetDatetime={sel_end_datetime}
                  name="+16시간"
                />
                <DesingedCalButton
                  onClick={() => {
                    setEndDatetimeStaffCabinet(sel_start_datetime);
                  }}
                >
                  현재 시각
                </DesingedCalButton>
              </ButtonContainer>
            </AllocateContent>
          </React.Fragment>
        ) : (
          ""
        )}
        {confirm_show ? (
          <ConfirmButtonContainer>
            <ConfrimButton onClick={onConfirmButtonClick} color="#273c75">
              등록
            </ConfrimButton>
          </ConfirmButtonContainer>
        ) : (
          ""
        )}
      </AllocateContainer>
    </AllocateBack>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CalHourButton = (props, context) => {
  const { addValues, setFunc, targetDatetime, name } = props;
  const onButtonClick = () => {
    const resultValue = moment(targetDatetime)
      .add(addValues * 24, "h")
      .format("YYYY-MM-DD HH:mm:ss");
    setFunc(resultValue);
  };
  return <DesingedCalButton onClick={onButtonClick}>{name}</DesingedCalButton>;
};

const DesingedCalButton = styled.button`
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

const MemberList = (props, context) => {
  const { id, gender, username, birth, name, onMemberClick } = props;
  const onMemberClickHandler = () => {
    onMemberClick(id);
  };
  return (
    <Row member onClick={onMemberClickHandler}>
      <Col>{gender === "male" ? "남" : gender === "female" ? "여" : ""}</Col>
      <Col>{username}</Col>
      <Col>{moment(birth).format("YYYY-MM-DD")}</Col>
      <Col>{name}</Col>
    </Row>
  );
};

const SearchFormSet = (props, context) => {
  const {
    handleChange,
    handleSubmit,
    keyword,
    handleSelectChange,
    scope
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <ScopeSelect value={scope} onChange={handleSelectChange}>
        <option value="name">이름</option>
        <option value="userid">아이디</option>
        <option value="phone">전화번호</option>
      </ScopeSelect>
      <SearchForm type="text" onChange={handleChange} value={keyword} />
      <SearchButton type="submit" value="검색" />
    </form>
  );
};

const ConfirmButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;
const ConfrimButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
  margin: 5px;
  color: white;
  background-color: ${props => props.color};
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: #2980b9;
  }
`;

const SelWhenTitle = styled.div`
  border-top: 1px solid #e4e4e4;
  padding-top: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 13px;
`;

const SearchedTable = styled.div`
  margin-top: 25px;
  ${breakpoint("mobile")`
  font-size:12px;`};

  ${breakpoint("tablet")`
  font-size: 14px;`};

  ${breakpoint("desktop")`
  font-size: 14px;`};
`;

const ContentContainer = styled.div`
  max-height: 150px;
  background-color: #dedede;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Row = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  justify-content: space-around;
  display: flex;
  &:nth-child(2n) {
    background-color: #f8f6ff;
    color: black;
  }
  &:nth-child(2n + 1) {
    background-color: white;
    color: black;
  }
  ${props =>
    props.member
      ? "cursor:pointer; &:hover{background-color:#1e3799; color:white;}"
      : ""};
`;

const TitleContainer = styled.div`
  ${Row} {
    background-color: #6c71e3;
    color: white;
  }
`;
const Col = styled.div`
  text-align: center;
  &:nth-child(1) {
    flex-basis: 40px;
  }
  &:nth-child(2) {
    flex-basis: 80px;
  }
  &:nth-child(3) {
    flex-basis: 80px;
  }
  &:nth-child(4) {
    flex-basis: 100px;
  }
`;

const AllocateBack = styled.div`
  width: 100%;
  padding: 10px 10px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
`;

const AllocateContainer = styled.div`
  width: 100%;
`;

const AllocateContent = styled.div``;

const SearchForm = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #1b9cfc;
  margin-right: 10px;
  margin-left: 15px;
`;

const SearchButton = styled.input`
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

const ScopeSelect = styled.select`
  margin-left: 10px;
  height: 100%;
  background-color: white;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  cursor: text;
  border: 1px solid #cccccc;
`;

AdminAllocateCabinet.propTypes = {};

AdminAllocateCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminAllocateCabinet;
