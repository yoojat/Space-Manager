import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    user: { profile_image, username, name },
    regist: { sel_branch, sel_cost_type, sel_cabinet_set }
  } = state;
  return {
    branches,
    profile_image,
    username,
    name,
    sel_branch,
    sel_cost_type,
    sel_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(branchActions.fetchBranches());
    },
    fetchMyCabinets: () => {
      dispatch(cabinetActions.fetchMyCabinets());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
