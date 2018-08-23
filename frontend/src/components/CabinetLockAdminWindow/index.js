import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetLockActions } from "redux/modules/staffCabinetLock";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setModalWindowShowFalse: () => {
      dispatch(staffCabinetLockActions.setModalWindowShowFalse());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
