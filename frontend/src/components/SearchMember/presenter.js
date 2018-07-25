import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import moment from "moment";

const SearchMember = (props, context) => {
  const {
    onInputChange,
    onSearchButtonClick,
    handleOnKeyUp,
    keyword,
    onMemberClick
  } = props;
  return (
    <MemberBackContainer>
      <TitleTagCon>
        <TitleTag>
          <Input
            onChange={onInputChange}
            onKeyUp={handleOnKeyUp}
            value={keyword}
          />{" "}
          <Button onClick={onSearchButtonClick}>검색</Button>
        </TitleTag>
      </TitleTagCon>
      <TitleContainer>
        <Row>
          <Name>이름</Name>
          <UserId>아이디</UserId>
          <Old>나이</Old>
          <Phone>전화번호</Phone>
          <EnrollTime>멤버쉽 시작일시</EnrollTime>
          <EndTime>멤버쉽 만료일시</EndTime>
        </Row>
      </TitleContainer>
      <MemberContainer>
        {props.found_users ? (
          props.found_users.length ? (
            props.found_users.map(found_user => (
              <MemberList
                found_user={found_user}
                onMemberClick={onMemberClick}
                key={found_user.id}
              />
              // <Row key={found_user.id}>
              //   <Name>{found_user.name}</Name>
              //   <UserId>{found_user.username}</UserId>
              //   <Old>
              //     {moment().year() - moment(found_user.birth).year() + 1}
              //   </Old>
              //   <Phone>{found_user.phone}</Phone>
              //   <EnrollTime>
              //     {found_user.memberships.length
              //       ? found_user.memberships[0].start_date
              //       : ""}
              //   </EnrollTime>
              //   <EndTime>
              //     {found_user.memberships.length
              //       ? found_user.memberships[0].end_date
              //       : ""}
              //   </EndTime>
              // </Row>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>검색 결과가 없습니다</div>
          )
        ) : (
          ""
        )}
      </MemberContainer>
    </MemberBackContainer>
  );
};

const MemberList = (props, context) => {
  const { found_user, onMemberClick } = props;

  const clickHandler = () => {
    onMemberClick(found_user.id);
  };
  return (
    <Row key={found_user.id} onClick={clickHandler}>
      <Name>{found_user.name}</Name>
      <UserId>{found_user.username}</UserId>
      <Old>{moment().year() - moment(found_user.birth).year() + 1}</Old>
      <Phone>{found_user.phone}</Phone>
      <EnrollTime>
        {found_user.memberships.length
          ? found_user.memberships[0].start_date
          : ""}
      </EnrollTime>
      <EndTime>
        {found_user.memberships.length
          ? found_user.memberships[0].end_date
          : ""}
      </EndTime>
    </Row>
  );
};

const Button = styled.button`
  border-radius: 50px;
  padding: 3px;
  min-width: 60px;
  color: white;
  font-weight: 600;
  -wepkit-appearance: none;
  cursor: pointer;
  $:active,
  $:focus {
    outline: none;
  }
  background-color: #56aeea;
  margin-left: 10px;
  border: none;
`;

const Input = styled.input.attrs({
  placeholder: "아이디 혹은 이름을 입력해주세요"
})`
  border-radius: 5px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  padding: 4px 6px;
  width: 160px;
  cursor: text;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  transition: border linear 0.2s, box-shadow linear 0.2s;
`;

const MemberBackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-top: 30px;

  ${breakpoint("mobile")`
    font-size: 10px;
  `};
  ${breakpoint("tablet")`
  font-size: 12px;
`};

  ${breakpoint("desktop")`
  font-size: 12px;
`};
`;

const TitleTagCon = styled.div`
  width: 95%;
`;

const TitleTag = styled.div`
  display: flex;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
`;
const TitleContainer = RowContainer.extend`
  padding-top: inherit;
  padding-bottom: inherit;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const MemberContainer = RowContainer.extend`
  background-color: white;
  width: 95%;
  border: 1px solid #dedede;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100px;
  ${Row} {
    &:hover {
      background-color: #56aeea;
      color: white;
    }
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 40px;
    align-items: center;
  }
`;

const Name = styled.div`
  flex-basis: 80px;
`;

const Old = styled.div`
  flex-basis: 30px;
`;

const UserId = styled.div`
  flex-basis: 100px;
  ${breakpoint("mobile")`
display:none;
`};

  ${breakpoint("tablet")`
display:block;
`};

  ${breakpoint("desktop")`
display:block;
`};
`;

const Phone = styled.div`
  ${breakpoint("mobile")`
display:none;
`};
  ${breakpoint("tablet")`
display:block;
`};

  ${breakpoint("desktop")`
display:block;
`};

  flex-basis: 160px;
`;

const EnrollTime = styled.div`
  flex-basis: 160px;
`;

const EndTime = styled.div`
  flex-basis: 160px;
`;

SearchMember.propTypes = {};

SearchMember.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SearchMember;
