import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { is_extend_cabinet, cabinets_extend, target_user },
    user
  } = state;
  return {
    is_extend_cabinet,
    cabinets_extend,
    target_user,
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
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    },
    setExtendCabinetTargetUser: target_user => {
      dispatch(extendCabinetActions.setExtendCabinetTargetUser(target_user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
