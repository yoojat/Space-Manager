import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetLockActions } from "redux/modules/staffCabinetLock";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetLock: {
      branches,
      sel_branch,
      cabinet_locks,
      modal_show,
      cabinets
    }
  } = state;

  return { branches, sel_branch, cabinet_locks, modal_show, cabinets };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(staffCabinetLockActions.fetchBranches());
    },
    setBranchForCabinetLocks: branch => {
      dispatch(staffCabinetLockActions.setBranchForCabinetLocks(branch));
    },
    fetchCabinetLocks: branch_id => {
      dispatch(staffCabinetLockActions.fetchCabinetLocks(branch_id));
    },
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
    setModalWindowShowTrue: () => {
      dispatch(staffCabinetLockActions.setModalWindowShowTrue());
    },
    fetchCabinets: branch_id => {
      dispatch(staffCabinetLockActions.fetchCabinets(branch_id));
    },
    deleteLock: cabinet_id => {
      dispatch(staffCabinetLockActions.deleteLock(cabinet_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
