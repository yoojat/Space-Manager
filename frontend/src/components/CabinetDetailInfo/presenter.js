import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "components/Loading";
import breakpoint from "styled-components-breakpoint";
import moment from "moment";
import CabinetAdminWindow from "components/CabinetAdminWindow";

const CabinetDetailInfo = (props, context) => {
  const {
    loading,
    sel_cabinet_detail,
    sel_cabinet,
    onEnrollBtnClick,
    onExtendBtnClick,
    onExpireBtnClick,
    onCleanBtnClick,
    onMoveBtnClick,
    onModifyBtnClick,
    window_show,
    setWindowShowFalse
  } = props;
  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        textAlign: "center"
      }}
    >
      <Loading />
    </div>
  ) : (
    <React.Fragment>
      <RenderCabinetDetailInfo
        sel_cabinet_detail={sel_cabinet_detail}
        sel_cabinet={sel_cabinet}
        onEnrollBtnClick={onEnrollBtnClick}
        onExtendBtnClick={onExtendBtnClick}
        onExpireBtnClick={onExpireBtnClick}
        onCleanBtnClick={onCleanBtnClick}
        onMoveBtnClick={onMoveBtnClick}
        onModifyBtnClick={onModifyBtnClick}
      />
      {window_show ? (
        <CabinetAdminWindow close_func={setWindowShowFalse} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

const RenderCabinetDetailInfo = (props, context) => {
  const {
    sel_cabinet,
    sel_cabinet_detail,
    onEnrollBtnClick,
    onExtendBtnClick,
    onExpireBtnClick,
    onCleanBtnClick,
    onMoveBtnClick,
    onModifyBtnClick
  } = props;
  return (
    <React.Fragment>
      <CabinetDetailInfoContainer>
        <NowUserInfoContainer>
          <CabinetDetailInfoTitle>현재 이용자 정보</CabinetDetailInfoTitle>

          {!sel_cabinet.is_clean ? (
            <React.Fragment>
              <MainTextContainer>
                <MainTextRow>
                  <MainTexColContainer>
                    <MainTextCol>현재 이용자</MainTextCol>
                    <MainTextCol>{sel_cabinet.user.name}</MainTextCol>
                  </MainTexColContainer>
                </MainTextRow>
                <MainTextRow>
                  <MainTexColContainer>
                    <MainTextCol>등록 일시</MainTextCol>
                    <MainTextCol>
                      {moment(sel_cabinet_detail.created_at).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </MainTextCol>
                  </MainTexColContainer>
                </MainTextRow>
                <MainTextRow>
                  <MainTexColContainer>
                    <MainTextCol>시작 일시</MainTextCol>
                    <MainTextCol>
                      {moment(sel_cabinet_detail.start_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </MainTextCol>
                  </MainTexColContainer>
                </MainTextRow>
                <MainTextRow>
                  <MainTexColContainer>
                    <MainTextCol>종료 일시</MainTextCol>
                    <MainTextCol>
                      {moment(sel_cabinet_detail.end_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </MainTextCol>
                  </MainTexColContainer>
                </MainTextRow>
              </MainTextContainer>
            </React.Fragment>
          ) : (
            <div
              style={{
                width: "100%",
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div>현재 이용중이 아닙니다</div>
            </div>
          )}
          <ButtonContainer>
            {!sel_cabinet.is_clean ? (
              moment(sel_cabinet.end_date).valueOf() > moment().valueOf() ? (
                <React.Fragment>
                  <CabinetButton
                    action="extend"
                    fontColor="white"
                    onClick={onEnrollBtnClick}
                  >
                    사물함 연장
                  </CabinetButton>
                  <CabinetButton
                    action="expire"
                    fontColor="white"
                    onClick={onExpireBtnClick}
                  >
                    사물함 만료
                  </CabinetButton>
                  <CabinetButton
                    action="shift"
                    fontColor="white"
                    onClick={onMoveBtnClick}
                  >
                    사물함 이동
                  </CabinetButton>

                  <CabinetButton
                    action="modify"
                    fontColor="white"
                    onClick={onModifyBtnClick}
                  >
                    사물함 수정
                  </CabinetButton>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CabinetButton
                    action="clean"
                    fontColor="white"
                    onClick={onCleanBtnClick}
                  >
                    사물함 정리
                  </CabinetButton>
                  <CabinetButton
                    action="modify"
                    fontColor="white"
                    onClick={onModifyBtnClick}
                  >
                    사물함 수정
                  </CabinetButton>
                </React.Fragment>
              )
            ) : (
              <CabinetButton
                action="regist"
                fontColor="white"
                onClick={onEnrollBtnClick}
              >
                사물함 등록
              </CabinetButton>
            )}
          </ButtonContainer>
        </NowUserInfoContainer>

        <LogContainer>
          <CabinetDetailInfoTitle>
            {sel_cabinet_detail.cabinet_number}번 사물함 이용 기록
          </CabinetDetailInfoTitle>
          {sel_cabinet_detail.cabinet_historys.length ? (
            <LogDataContainer>
              {sel_cabinet_detail.cabinet_historys.map(history => (
                <LogDataList
                  en_action={history.cabinet_action.substance}
                  username={history.user.name}
                  action={history.cabinet_action.kr_substance}
                  created_at={history.created_at}
                  start_date={history.start_date}
                  end_date={history.end_date}
                  key={history.id}
                />
              ))}
            </LogDataContainer>
          ) : (
            <div
              style={{
                width: "100%",
                height: "84%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div>이용 기록이 없습니다</div>
            </div>
          )}
        </LogContainer>
      </CabinetDetailInfoContainer>
    </React.Fragment>
  );
};

const LogDataList = (props, context) => (
  <LogRow>
    <LogLeftCol>
      <LogLeftRow>
        <UserCol>이용자</UserCol>
        <UserCol>{props.username}</UserCol>
      </LogLeftRow>
      <LogLeftRow>
        <CabinetAction action={props.en_action}>{props.action}</CabinetAction>
      </LogLeftRow>
    </LogLeftCol>
    <LogRightCol>
      <LogRightRow>
        등록 일시 : {moment(props.created_at).format("YYYY-MM-DD HH:mm:ss")}
      </LogRightRow>
      <LogRightRow>
        시작 일시 : {moment(props.start_date).format("YYYY-MM-DD HH:mm:ss")}
      </LogRightRow>
      <LogRightRow>
        종료 일시 : {moment(props.end_date).format("YYYY-MM-DD HH:mm:ss")}
      </LogRightRow>
    </LogRightCol>
  </LogRow>
);

const CabinetDetailInfoTitle = styled.div`
  ${breakpoint("mobile")`
font-size : 15px;`};

  ${breakpoint("tablet")`
font-sizez: 18px;`};

  ${breakpoint("desktop")`
font-size: 18px;`};
`;

const CabinetDetailInfoContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  ${breakpoint("mobile")`
  font-size : 15px;
  flex-wrap: wrap;`};
  ${breakpoint("tablet")`
  font-size: 18px;
  flex-wrap: nowrap;`};
  ${breakpoint("desktop")`
  font-size: 18px;
  flex-wrap: nowrap;`};
`;

const NowUserInfoContainer = styled.div`
  min-width: 230px;
  flex-basis: 300px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 20px;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 5px 10px 8px #888888;
  min-height: 185px;
`;
const LogContainer = styled.div`
  min-width: 230px;
  min-height: 185px;
  flex-basis: 500px;
  padding: 20px;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 5px 10px 8px #888888;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
`;
const LogDataContainer = styled.div`
  margin-top: 5px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 360px;
`;
const MainTextContainer = styled.div`
  margin-top: 15px;
`;

const MainTextRow = styled.div`
  display: flex;
  background-color: #f6f6f6;
  margin-bottom: 10px;

  &:nth-child(3n + 1) {
    &::before {
      background-color: #79becd;
      content: "";
      width: 5px;
    }
  }
  &:nth-child(3n + 2) {
    &::before {
      background-color: #418f77;
      content: "";
      width: 5px;
    }
  }
  &:nth-child(3n) {
    &::before {
      background-color: #d89688;
      content: "";
      width: 5px;
    }
  }
`;
const MainTextCol = styled.div`
  &:nth-child(1) {
    color: #b7b7b7;
    font-size: 13px;
  }
  &:nth-child(2) {
    ${breakpoint("mobile")`
    font-size : 12px;`};

    ${breakpoint("tablet")`
    font-size: 14px;`};

    ${breakpoint("desktop")`
    font-size: 18px;`};

    padding: 3px 0px;
  }
`;

const MainTexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const CabinetButton = styled.div`
  -webkit-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -moz-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -ms-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  -o-transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);
  display: block;
  max-width: 120px;
  border-radius: 4px;
  padding: 10px 7px;
  cursor: pointer;
  text-align: center;
  box-shadow: rgba(30, 22, 54, 0.4) 0 0px 0px 2px inset;
  margin: 2px;
  width: 45%;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
  }

  background: ${props =>
    props.action
      ? props.action === "regist"
        ? "#341f97"
        : props.action === "extend"
          ? "#ff9f43"
          : props.action === "expire"
            ? "#ee5253"
            : props.action === "clean"
              ? "#00d2d3"
              : props.action === "shift"
                ? "#576574"
                : props.action === "modify"
                  ? "#1dd1a1"
                  : ""
      : ""};

  color: ${props =>
      props.fontColor
        ? props.fontColor === "white"
          ? "white"
          : props.fontColor === "black"
            ? "black"
            : ""
        : ""}
    ${breakpoint("mobile")`
  font-size : 12px;`};

  ${breakpoint("tablet")`
  font-size: 14px;`};

  ${breakpoint("desktop")`
  font-size: 18px;`};
`;
const LogRow = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid #d7d7d7;
  background-color: #f6f6f6;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const LogLeftCol = styled.div`
  flex-basis: 100px;
  text-align: center;
  ${breakpoint("mobile")`margin-bottom:10px;`};
`;
const LogLeftRow = styled.div``;
const LogRightCol = styled.div`
  flex-basis: 265px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${breakpoint("mobile")`
  font-size : 11px;`};

  ${breakpoint("tablet")`
  font-size: 13px;`};

  ${breakpoint("desktop")`
  font-size: 13px;`};
`;

const LogRightRow = styled.div``;
const CabinetAction = styled.div`
  background: ${props =>
    props.action
      ? props.action === "regist"
        ? "#341f97"
        : props.action === "extend"
          ? "#ff9f43"
          : props.action === "expire"
            ? "#ee5253"
            : props.action === "clean"
              ? "#00d2d3"
              : props.action === "shift"
                ? "#576574"
                : props.action === "modify"
                  ? "#1dd1a1"
                  : ""
      : ""};
  color: white;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  font-size: 10px;
`;

const UserCol = styled.div`
  &:nth-child(1) {
    font-size: 12px;
    color: #b7b7b7;
  }
  &:nth-child(2) {
    font-size: 16px;
    margin-top: 6px;
    margin-bottom: 10px;
  }
`;

CabinetDetailInfo.propTypes = {};

CabinetDetailInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetDetailInfo;
