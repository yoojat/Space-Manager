import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styled from "styled-components";
import moment from "moment";
import breakpoint from "styled-components-breakpoint";
import SeatControl from "components/SeatControl";
import AdminAllocate from "components/AdminAllocate";
import AdminReturn from "components/AdminReturn";

const SeatInfo = (props, context) => {
  const {
    loading,
    sel_branch_for_seat_man,
    sel_seat_for_seat_man,
    sel_room_for_seat_man,
    onReturnButtonClick,
    onAllocateButtonClick,
    show_assign,
    show_return,
    setShowAssignFalse,
    setShowReturnFalse
  } = props;
  return loading ? (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  ) : (
    <SeatInfoBack>
      <SeatInfoContainer>
        <SeatInfoTitleContainer>
          <SeatInfoTitle>
            {sel_branch_for_seat_man.branch_name}{" "}
            {sel_room_for_seat_man.room_type.kr_substance}{" "}
            {sel_seat_for_seat_man.seat_number}번 좌석
          </SeatInfoTitle>
          <LogTable>
            <LogTableHead>
              <LogRow>
                <LogCol>처리 일시</LogCol>
                <LogCol>이름</LogCol>
                <LogCol>처리</LogCol>
              </LogRow>
            </LogTableHead>
            <LogTableBody>
              {sel_seat_for_seat_man.logs.length ? (
                sel_seat_for_seat_man.logs.map(log => (
                  <LogRow key={log.id}>
                    <LogCol>
                      {moment(log.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </LogCol>
                    {/* <LogCol>{log.user.name}</LogCol> */}
                    <LogCol>{log.action.kr_substance}</LogCol>
                  </LogRow>
                ))
              ) : (
                <LogRow>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    현재 이용기록이 없습니다
                  </div>
                </LogRow>
              )}
            </LogTableBody>
          </LogTable>
        </SeatInfoTitleContainer>
      </SeatInfoContainer>

      {sel_seat_for_seat_man.now_using &&
      moment(sel_seat_for_seat_man.end_datetime).valueOf() >
        moment().valueOf() ? (
        <SeatInfoContainer>
          <SeatButton onClick={onReturnButtonClick}>좌석 반납</SeatButton>
        </SeatInfoContainer>
      ) : (
        <SeatInfoContainer>
          <SeatButton onClick={onAllocateButtonClick}>좌석 배정</SeatButton>
        </SeatInfoContainer>
      )}

      {show_assign ? (
        <SeatControl
          content={<AdminAllocate />}
          close_func={setShowAssignFalse}
          title="좌석 배정"
        />
      ) : (
        ""
      )}
      {show_return ? (
        <SeatControl
          content={<AdminReturn />}
          close_func={setShowReturnFalse}
          title="좌석 반납"
        />
      ) : (
        ""
      )}
    </SeatInfoBack>
  );
};

const LoadingContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeatInfoBack = styled.div`
  margin-top: 30px;
  width: 100%;
  text-align: left;
  font-weight: lighter;
`;

const SeatInfoContainer = styled.div`
  text-align: center;
`;

const SeatInfoTitleContainer = styled.div``;

const SeatInfoTitle = styled.div`
  font-size: 13px;
  padding-left: 20px;
`;

const LogTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 10px auto;
  text-align: center;
  ${breakpoint("mobile")`
  font-size:11px;`}
  ${breakpoint("tablet")`
  font-size: 13px;`}
  ${breakpoint("desktop")`
  font-size:13px;`}`;

const LogTableHead = styled.div`
  background-color: #3498db;
  color: white;
`;

const LogTableBody = styled.div`
  max-height: 100px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const LogRow = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: space-around;
  &:nth-child(even) {
    background-color: #eaeae8;
  }
  &:nth-child(2n + 3) {
    background-color: white;
  }
  border-bottom: 1px solid #3498db;
`;
const LogCol = styled.div`
  &:nth-child(1) {
    flex-basis: 200px;
  }
  &:nth-child(2) {
    flex-basis: 80px;
  }
  &:nth-child(3) {
    flex-basis: 50px;
  }
`;

const SeatButton = styled.button`
  background: #1b9cfc;
  color: #fff;
  border: none;
  position: relative;
  height: 30px;
  font-size: 14px;
  padding: 0 2em;
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
SeatInfo.propTypes = {};

SeatInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SeatInfo;
