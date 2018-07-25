import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";

const SimpleProfile = (props, context) => {
  const { now_view_user, now_membership_end_date, now_user_created_at } = props;

  return (
    <ProfileContainer>
      <NameContainer>
        <div>{now_view_user.name}</div>
      </NameContainer>
      <UserIdContainer>
        <Ionicon
          icon={
            now_view_user.gender === "male"
              ? "ios-man"
              : now_view_user.gender === "female"
                ? "ios-woman"
                : ""
          }
          fontSize="20px"
          color="black"
        />{" "}
        <div>{now_view_user.username}</div>
      </UserIdContainer>
      <AddressContainer>
        <div />
      </AddressContainer>
      <PhoneContainer>
        <Ionicon icon="ios-call" fontSize="20px" color="black" />
        <div>0102315257</div>
      </PhoneContainer>
      <JoinedContainer>가입 일시 : {now_user_created_at}</JoinedContainer>
      <ExpiredContainer>
        멤버쉽 만료 :{" "}
        {now_membership_end_date ? now_membership_end_date : "미등록 상태"}
      </ExpiredContainer>
      <ButtonContainer>
        <Link to="/super/membership">
          <Button color="#3498db">멤버쉽 등록</Button>
        </Link>
        <Link to="/super/cabinet">
          <Button color="#3498db">사물함 등록</Button>
        </Link>
      </ButtonContainer>
    </ProfileContainer>
  );
};

SimpleProfile.propTypes = {};

SimpleProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SimpleProfile;

const ProfileContainer = styled.div`
  background-color: white;
  max-width: 320px;
  padding: 20px;
  color: #929292;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  padding: 10px 0px;
  font-weight: lighter;
`;
const UserIdContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0px;
`;
const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0px;
`;
const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0px;
`;

const JoinedContainer = styled.div`
  padding: 3px 0px;
`;
const ExpiredContainer = styled.div`
  padding: 3px 0px;
`;

const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
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
