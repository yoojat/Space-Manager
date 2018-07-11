import React from "react";
import PropTypes from "prop-types";
import EnrollCabinetOnly from "components/EnrollCabinetOnly";
import ExtendCabinetOnly from "components/ExtendCabinetOnly";
import Loading from "components/Loading";

const RegistCabinet = (props, context) => {
  const { my_cabinets, loading } = props;
  //현재 이용중인 사물함이 있는 지 확인
  //현재이용중인 사물함을 연장할것인지 물어보기
  // 예 하면 연장창으로
  // 아니오 하면 등록창으로
  return loading ? (
    <Loading />
  ) : my_cabinets.length ? (
    <ExtendCabinetOnly />
  ) : (
    <EnrollCabinetOnly />
  );
};

RegistCabinet.propTypes = {};

RegistCabinet.contextTypes = {
  t: PropTypes.func.isRequired
};

export default RegistCabinet;
