import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const MembershipInfo = (props, context) => {
  const { now_view_member_memberships } = props;
  return (
    <MembershipInfoContainer>
      <TitleContainer>
        <div>이용중인 멤버쉽</div>
      </TitleContainer>
      <ContentContainer>
        {now_view_member_memberships.map(membership => (
          <Row key={membership.id}>
            <TimeCol>
              <TitleCol>등록 일시 :</TitleCol>
              {moment(membership.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>멤버쉽 시작 :</TitleCol>
              {membership.start_date}
            </TimeCol>
            <TimeCol>
              <TitleCol>멤버쉽 종료 :</TitleCol>
              {membership.end_date}
            </TimeCol>
          </Row>
        ))}
      </ContentContainer>
    </MembershipInfoContainer>
  );
};

MembershipInfo.propTypes = {};

MembershipInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

const MembershipInfoContainer = styled.div`
  background-color: #ffffff;
  min-height: 130px;
  box-shadow: 0px -5px 1px 0px #e7e7eb;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  padding: 16px 5px;
  font-weight: lighter;
  border-bottom: 2.5px solid #ededed;
`;
const ContentContainer = styled.div`
  overflow: scroll;
  height: 180px;
  padding: 10px;
`;
const Row = styled.div`
  font-size: 11px;
  border-bottom: 2.3px solid #dedede;
  padding-bottom: 15px;
`;

const TimeCol = styled.div`
  padding: 3px 5px;
  display: flex;
  justify-content: center;
`;

const TitleCol = styled.div`
  width: 100px;
`;

export default MembershipInfo;
