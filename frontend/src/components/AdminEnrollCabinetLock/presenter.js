import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import breakpoint from "styled-components-breakpoint";

const AdminEnrollCabinetLock = (props, context) => {
  const {
    onConfirmClick,
    sel_branch,
    cabinet_id,
    lock_num,
    password,
    onCabinetNumChange,
    onLockNumChange,
    onPasswordChange,
    cabinets
  } = props;

  return (
    <ConatinerEnrollCabLock>
      <EnrollLockRow>
        <EnrollLockTitle>{sel_branch.branch_name} 자물쇠 추가</EnrollLockTitle>
      </EnrollLockRow>
      <EnrollLockRow>
        <Title>사물함 번호</Title>
        <CabinetSelectContainer>
          <CabinetSelect onChange={onCabinetNumChange} value={cabinet_id}>
            {cabinets.map(cabinet => {
              return (
                <option key={cabinet.id} value={cabinet.id}>
                  {cabinet.cabinet_number}
                </option>
              );
            })}
          </CabinetSelect>
          {/* TODO: 사물함 드랍다운 리스트로 선택하게 만들 것 */}
        </CabinetSelectContainer>
      </EnrollLockRow>
      <EnrollLockRow>
        <Title>자물쇠 번호</Title>
        <LockInput
          placeholder="자물쇠 번호를 입력해주세요"
          value={lock_num}
          onChange={onLockNumChange}
          type="number"
        />
      </EnrollLockRow>
      <EnrollLockRow>
        <Title>비밀 번호</Title>
        <LockInput
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onPasswordChange}
          type="number"
        />
      </EnrollLockRow>
      <EnrollLockRow>
        <ConfirmButtonContainer>
          <ConfirmButton onClick={onConfirmClick}>수정하기</ConfirmButton>
        </ConfirmButtonContainer>
      </EnrollLockRow>
    </ConatinerEnrollCabLock>
  );
};

const CabinetSelectContainer = styled.div`
  margin-top: 6px;
  margin-bottom: 10px;
`;
const CabinetSelect = styled.select`
  text-align-last: center;
  padding-right: 29px;
  width: 100%;
  background-color: #3498db;
  border: none;
  color: white;
  height: 22px;
  cursor: pointer;
`;

const EnrollLockTitle = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const LockInput = styled.input`
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 20px;
`;

const ConatinerEnrollCabLock = styled.div`
  padding: 25px;
`;
const EnrollLockRow = styled.div``;
const Title = styled.div``;

const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
`;

const ConfirmButton = styled.button`
  width: 90px;
  height: 100%;
  background: #4834d4;
  color: #fff;
  border: none;
  position: relative;
  font-size: 11px;
  padding: 7px 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 1px;
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

AdminEnrollCabinetLock.propTypes = {};

AdminEnrollCabinetLock.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AdminEnrollCabinetLock;
