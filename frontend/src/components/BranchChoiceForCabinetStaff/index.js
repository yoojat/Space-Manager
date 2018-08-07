import { connect } from "react-redux";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_branch },
    branch: { branches }
  } = state;
  return {
    branches,
    sel_branch
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(branchActions.fetchBranches());
    },
    getSelBranch: sel_branch_id => {
      dispatch(staffCabinetActions.getSelBranch(sel_branch_id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
