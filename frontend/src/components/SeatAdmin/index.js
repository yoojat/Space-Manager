import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as staffSeatActions } from "redux/modules/staffSeat";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    staffSeat: { sel_branch_for_seat_man }
  } = state;

  return { branches, sel_branch_for_seat_man };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(branchActions.fetchBranches());
    },
    getBranchInfo: branch_id => {
      dispatch(staffSeatActions.getBranchInfo(branch_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
