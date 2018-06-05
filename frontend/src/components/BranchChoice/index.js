import { connect } from "react-redux";
import { actionCreators as registActions } from "redux/modules/regist";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { sel_branch },
    branch: { branches }
  } = state;
  return {
    sel_branch,
    branches
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelBranch: branch_id => {
      dispatch(registActions.fetchSelBranch(branch_id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
