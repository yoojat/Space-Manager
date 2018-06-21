import { connect } from "react-redux";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: { sel_branch },
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
      dispatch(enrollMembershipActions.fetchSelBranch(branch_id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
