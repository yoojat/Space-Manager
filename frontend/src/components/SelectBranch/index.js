import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches }
  } = state;
  const {
    regist: { sel_branch }
  } = state;
  return {
    branches,
    sel_branch
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBranches: () => {
      dispatch(branchActions.getBranches());
    },
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },
    getSelBranch: branchId => {
      dispatch(registActions.getSelBranch(branchId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
