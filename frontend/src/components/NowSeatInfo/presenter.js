import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const NowSeatInfo = (props, context) => {
  const { now_view_member_seat_logs } = props;
  return (
    <MembershipInfoContainer>
      <TitleContainer>
        <div>최근 좌석 이용</div>
      </TitleContainer>
      <ContentContainer>
        {now_view_member_seat_logs.length ? (
          <Row>
            <MembershipTitleCol>
              <TitleCol>
                {now_view_member_seat_logs[0].seat.branch.branch_name}{" "}
                {now_view_member_seat_logs[0].seat.room.room_type.kr_substance}
                {`(${now_view_member_seat_logs[0].seat.room.room_number}번) `}
                {now_view_member_seat_logs[0].seat.seat_number}번 자리
                {now_view_member_seat_logs[0].action.en_substance === "stand_by"
                  ? " 대기"
                  : ""}
                {now_view_member_seat_logs[0].action.en_substance === "return"
                  ? " 반납"
                  : ""}
                {now_view_member_seat_logs[0].action.en_substance ===
                "allocation"
                  ? " 배정"
                  : ""}
              </TitleCol>
            </MembershipTitleCol>
            <TimeCol>
              <TitleCol>
                일시 :{" "}
                {moment(now_view_member_seat_logs[0].created_at).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </TitleCol>
            </TimeCol>
          </Row>
        ) : (
          <div>
            <div>현재 이용 기록이 없습니다</div>
          </div>
        )}
      </ContentContainer>
    </MembershipInfoContainer>
  );
};

NowSeatInfo.propTypes = {};

NowSeatInfo.contextTypes = {
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
`;

const TimeCol = styled.div`
  padding: 3px 5px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 77px;
  align-items: center;
`;

const MembershipTitleCol = styled.div`
  padding: 6px 5px;
  display: flex;
  justify-content: center;
  background-color: #fab1a0;
  color: white;
  text-align: center;
`;

const TitleCol = styled.div``;

export default NowSeatInfo;
