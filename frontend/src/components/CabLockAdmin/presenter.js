import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "components/Loading";
import breakpoint from "styled-components-breakpoint";
import CabinetLockAdminWindow from "components/CabinetLockAdminWindow";

const CabLockAdmin = (props, context) => {
  const {
    branches,
    loading,
    onBranchClick,
    sel_branch,
    cabinet_locks,
    locks_show,
    locks_loading,
    modal_show,
    onAddButtonClick,
    window_content,
    window_title,
    cabinets,
    deleteLock,
    onModifyButtonClick
  } = props;

  return loading ? (
    <Loading />
  ) : (
    <CabLockContainer>
      <ButtonContainer>
        {branches.map(branch => (
          <Button
            onClick={() => {
              onBranchClick(branch);
            }}
            key={branch.id}
            branch={branch}
            sel_branch={sel_branch}
          >
            {branch.branch_name}
          </Button>
        ))}
      </ButtonContainer>

      <AddButtonContainer>
        {locks_show && cabinets ? (
          <LockButton add onClick={onAddButtonClick}>
            자물쇠 추가
          </LockButton>
        ) : (
          ""
        )}
      </AddButtonContainer>

      <CabLockInfoBack>
        <CabLockInfoTitleContainer>
          <CabLockInfoRow>
            <NumberCol>사물함 번호</NumberCol>
            <LockNumCol>자물쇠 번호</LockNumCol>
            <PasswordCol>비밀번호</PasswordCol>
            <ButtonCol>수정/삭제</ButtonCol>
          </CabLockInfoRow>
        </CabLockInfoTitleContainer>
        <CabLockInfoContainer>
          {locks_show ? (
            locks_loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  maxHeight: "500px",
                  fontSize: "16px"
                }}
              >
                <Loading />
              </div>
            ) : (
              <React.Fragment>
                {cabinet_locks.map(cabinet_lock => (
                  <CabLockInfoRow key={cabinet_lock.id}>
                    <NumberCol>{cabinet_lock.cabinet.cabinet_number}</NumberCol>
                    <LockNumCol>{cabinet_lock.lock_number}</LockNumCol>
                    <PasswordCol>{cabinet_lock.lock_password}</PasswordCol>
                    <ButtonCol>
                      <LockButton
                        onClick={() => onModifyButtonClick(cabinet_lock.id)}
                      >
                        수정
                      </LockButton>
                      <LockButton
                        warn
                        onClick={() => {
                          deleteLock(cabinet_lock.id);
                        }}
                      >
                        삭제
                      </LockButton>
                    </ButtonCol>
                  </CabLockInfoRow>
                ))}
              </React.Fragment>
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                maxHeight: "500px",
                fontSize: "16px"
              }}
            >
              지점을 선택해주세요
            </div>
          )}
        </CabLockInfoContainer>
      </CabLockInfoBack>
      {modal_show ? (
        <CabinetLockAdminWindow title={window_title} content={window_content} />
      ) : (
        ""
      )}
    </CabLockContainer>
  );
};

const AddButtonContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  margin-bottom: 5px;
  margin-top: 35px;
`;

const CabLockInfoBack = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  box-shadow: 5px 10px 8px #888888;
  border-radius: 11px;
  ${breakpoint("mobile")`
  padding:9px;`};

  ${breakpoint("tablet")`
  padding: 14px;`};

  ${breakpoint("desktop")`
  padding: 30px;`};

  text-align: center;
  ${breakpoint("mobile")`
  font-size:12px;`};

  ${breakpoint("tablet")`
  font-size: 14px;`};

  ${breakpoint("desktop")`
  font-size: 14px;`};
  border: 1px solid #dedede;
`;
const CabLockContainer = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${breakpoint("mobile")`
  font-size:12px;`};

  ${breakpoint("tablet")`
  font-size: 14px;`};

  ${breakpoint("desktop")`
  font-size: 14px;`};
`;

const CabLockInfoTitleContainer = styled.div`
  background: #2980b9;
  color: white;
`;
const CabLockInfoContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  min-height: 200px;
  max-height: 500px;
`;
const CabLockInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  border-bottom: 1px solid #dedede;
`;
const NumberCol = styled.div`
  flex-basis: 85px;
`;
const LockNumCol = styled.div`
  flex-basis: 84px;
`;
const PasswordCol = styled.div`
  flex-basis: 77px;
`;
const ButtonCol = styled.div`
  flex-basis: 102px;
`;
const LockButton = styled.button`
  border: none;
  color: #ffffff;
  padding: 4px 8px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  margin: 3px 1px !important;
  text-decoration: none;
  font-size: 11px;
  cursor: pointer;
  background-color: ${props =>
    props.warn ? "#e74c3c" : props.add ? "#1e90ff" : "#00a8ff"};
  border-radius: 3px;
  &:hover {
    background-color: ${props =>
      props.warn ? "#c0392b" : props.add ? "#5352ed" : "#273c75"};
  }
`;

const Button = styled.button`
  margin: 10px;
  width: 90px;
  height: 100%;
  background: ${props =>
    props.sel_branch
      ? props.branch.id === props.sel_branch.id
        ? `#2c2c54`
        : `#1b9cfc`
      : `#1b9cfc`};
  color: #fff;
  border: none;
  position: relative;
  padding: 10px 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 2px;
  &:hover {
    background: ${props =>
      props.sel_branch
        ? props.branch.id === props.sel_branch.id
          ? `#2c2c54`
          : `#fff`
        : `#fff`};
    color: ${props =>
      props.sel_branch
        ? props.branch.id === props.sel_branch.id
          ? `#fff`
          : `#1b9cfc`
        : `#1b9cfc`};
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

CabLockAdmin.propTypes = {};

CabLockAdmin.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabLockAdmin;
