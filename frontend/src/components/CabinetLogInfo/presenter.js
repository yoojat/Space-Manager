import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const CabinetLogInfo = (props, context) => {
  const { cabinet_historys } = props;
  return (
    <MembershipInfoContainer>
      <TitleContainer>
        <div>사물함 등록 내역</div>
      </TitleContainer>
      <ContentContainer>
        {cabinet_historys.map(history => (
          <Row key={history.id}>
            <CabinetTitleCol>
              <TitleCol>
                {history.cabinet.cabinet_set.branch.branch_name}
              </TitleCol>
              {history.cabinet.cabinet_number}번 사물함{" "}
              {history.cabinet_action.substance === "regist" ? "등록" : ""}
              {history.cabinet_action.substance === "extend" ? "연장" : ""}
              {history.cabinet_action.substance === "expire" ? "만료" : ""}
              {history.cabinet_action.substance === "modify" ? "수정" : ""}
            </CabinetTitleCol>
            <TimeCol>
              <TitleCol>등록 일시 :</TitleCol>
              {moment(history.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>사물함 시작 :</TitleCol>
              {moment(history.start_date).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>사물함 종료 :</TitleCol>
              {moment(history.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
          </Row>
        ))}
      </ContentContainer>
    </MembershipInfoContainer>
  );
};

CabinetLogInfo.propTypes = {};

CabinetLogInfo.contextTypes = {
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
const CabinetTitleCol = styled.div`
  padding: 6px 5px;
  display: flex;
  justify-content: center;
  background-color: #f79f1f;
  color: white;
`;
const TitleCol = styled.div`
  width: 100px;
`;

export default CabinetLogInfo;
