import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as minimapActions } from "redux/modules/minimap";

const mapStateToProps = (state, ownProps) => {
  const { branch } = state;
  return {
    now_branch: branch.now_branch
  };
};

// dispatch는 액션을 리듀서로 보내는 function
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBranch: () => {
      dispatch(branchActions.getBranch());
    },
    getMinimapBranch: () => {
      dispatch(minimapActions.getMinimapBranch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
