import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const CabinetInfo = (props, context) => {
  const { now_view_member_cabinets } = props;
  return (
    <CabinetInfoContainer>
      <TitleContainer>
        <div>이용중인 사물함</div>
      </TitleContainer>
      <ContentContainer>
        {now_view_member_cabinets.map(cabinet => (
          <Row key={cabinet.id}>
            <CabinetTitleCol>
              <TitleCol>{cabinet.cabinet_set.branch.branch_name}</TitleCol>
              {cabinet.cabinet_number}번 사물함
            </CabinetTitleCol>
            <TimeCol>
              <TitleCol>등록 일시 :</TitleCol>
              {moment(cabinet.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>사물함 시작 :</TitleCol>
              {moment(cabinet.start_date).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
            <TimeCol>
              <TitleCol>사물함 종료 :</TitleCol>
              {moment(cabinet.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </TimeCol>
          </Row>
        ))}
      </ContentContainer>
    </CabinetInfoContainer>
  );
};

CabinetInfo.propTypes = {};

CabinetInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

const CabinetInfoContainer = styled.div`
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
  overflow-x:hidden;
  overflow-y:auto
  height: 120px;
  padding: 10px;
`;
const Row = styled.div`
  font-size: 11px;
  border-bottom: 2.3px solid #dedede;
  padding-bottom: 15px;
  margin-bottom: 10px;
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

export default CabinetInfo;
