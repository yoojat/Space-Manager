import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";
import { actionCreators as membershipActions } from "redux/modules/membership";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { profile_image, username, name },
    membership: { my_memberships }
  } = state;
  return {
    profile_image,
    username,
    name,
    my_memberships
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(branchActions.fetchBranches());
    },
    fetchMyCabinets: () => {
      dispatch(cabinetActions.fetchMyCabinets());
    },
    fetchMyMemberships: () => {
      dispatch(membershipActions.fetchMyMemberships());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
