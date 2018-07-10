import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as extendMembershipActions } from "redux/modules/extendMembership";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { is_extend_cabinet, cabinets_extend, sel_cabinet_costtype },
    user
  } = state;
  return {
    is_extend_cabinet,
    cabinets_extend,
    sel_cabinet_costtype,
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIsExtendCabinetTrue: () => {
      dispatch(extendCabinetActions.setIsExtendCabinetTrue());
    },
    setIsExtendCabinetFalse: () => {
      dispatch(extendCabinetActions.setIsExtendCabinetFalse());
    },
    clearEnrollMembership: () => {
      dispatch(enrollMembershipActions.clearEnrollMembership());
    },
    clearExtendMembership: () => {
      dispatch(extendMembershipActions.clearExtendMembership());
    },
    clearEnrollCabinet: () => {
      dispatch(enrollCabinetActions.clearEnrollCabinet());
    },
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
