import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const MembershipLogInfo = (props, context) => {
  const { now_view_user_membership_logs } = props;
  return (
    <MembershipInfoContainer>
      <TitleContainer>
        <div>멤버쉽 등록 내역</div>
      </TitleContainer>
      <ContentContainer>
        {now_view_user_membership_logs.map(history => (
          <Row key={history.id}>
            <MembershipTitleCol>
              <TitleCol>
                {history.branch.branch_name}{" "}
                {history.action.substance === "regist" ? "등록" : ""}
                {history.action.substance === "extend" ? "연장" : ""}
                {history.action.substance === "modify" ? "수정" : ""}
              </TitleCol>
            </MembershipTitleCol>
            <TimeCol>
              <TitleCol>등록 일시 :</TitleCol>
              {moment(history.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>멤버쉽 시작 :</TitleCol>
              {history.start_date}
            </TimeCol>
            <TimeCol>
              <TitleCol>멤버쉽 종료 :</TitleCol>
              {history.end_date}
            </TimeCol>
          </Row>
        ))}
      </ContentContainer>
    </MembershipInfoContainer>
  );
};

MembershipLogInfo.propTypes = {};

MembershipLogInfo.contextTypes = {
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
  overflow-x: hidden;
  overflow-y: auto;
  height: 120px;
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

const MembershipTitleCol = styled.div`
  padding: 6px 5px;
  display: flex;
  justify-content: center;
  background-color: #12cbc4;
  color: white;
  text-align: center;
`;

const TitleCol = styled.div`
  width: 100px;
`;

export default MembershipLogInfo;
