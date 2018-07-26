import React from "react";
import PropTypes from "prop-types";
import EnrollCabinetOnlySuper from "components/EnrollCabinetOnlySuper";
import ExtendCabinetOnlySuper from "components/ExtendCabinetOnlySuper";

const RegistCabinetSuper = (props, context) => {
  const { my_cabinets } = props;
  //현재 이용중인 사물함이 있는 지 확인
  //현재이용중인 사물함을 연장할것인지 물어보기
  // 예 하면 연장창으로
  // 아니오 하면 등록창으로
  return my_cabinets.length ? (
    <ExtendCabinetOnlySuper />
  ) : (
    <EnrollCabinetOnlySuper />
  );
};

RegistCabinetSuper.propTypes = {};

RegistCabinetSuper.contextTypes = {
  t: PropTypes.func.isRequired
};

export default RegistCabinetSuper;
