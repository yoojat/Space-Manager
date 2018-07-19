import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Ionicon from "react-ionicons";
import moment from "moment";

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
