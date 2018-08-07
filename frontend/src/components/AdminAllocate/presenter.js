import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import moment from "moment";
import AdminAllocateConfirm from "components/AdminAllocateConfirm";

const AdminAllocate = (props, context) => {
  const {
    handleChange,
    handleSubmit,
    keyword,
    searched_members,
    onMemberClick,
    confirm_show,
    handleSelectChange,
    scope
  } = props;

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
        {confirm_show ? (
          <AllocateContent>
            <AdminAllocateConfirm />
          </AllocateContent>
        ) : (
          ""
        )}
      </AllocateContainer>
    </AllocateBack>
  );
};

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
  padding-top: 5px;
  padding-bottom: 5px;
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

AdminAllocate.propTypes = {};

AdminAllocate.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminAllocate;
