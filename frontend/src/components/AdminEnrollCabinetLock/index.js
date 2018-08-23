import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetLockActions } from "redux/modules/staffCabinetLock";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetLock: { sel_branch, cabinets, temp_cabinet }
  } = state;

  return { sel_branch, cabinets, temp_cabinet };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addLock: (branch_id, cabinet_id, lock_number, password) => {
      dispatch(
        staffCabinetLockActions.addLock(
          branch_id,
          cabinet_id,
          lock_number,
          password
        )
      );
    },
    fetchCabinets: branch_id => {
      dispatch(staffCabinetLockActions.fetchCabinets(branch_id));
    },
    getCabinetLockByCabId: cabinet_id => {
      dispatch(staffCabinetLockActions.getCabinetLockByCabId(cabinet_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
