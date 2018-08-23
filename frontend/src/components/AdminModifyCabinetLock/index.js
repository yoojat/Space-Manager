import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetLockActions } from "redux/modules/staffCabinetLock";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetLock: { sel_branch, cab_lock_modify }
  } = state;

  return { sel_branch, cab_lock_modify };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCabinetLockByLockId: lock_id => {
      dispatch(staffCabinetLockActions.getCabinetLockByLockId(lock_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
