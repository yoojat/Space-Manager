import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";
import { actionCreators as membershipActions } from "redux/modules/membership";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    user: { profile_image, username, name },
    enrollMembership: {
      sel_branch,
      sel_cost_type,
      // sel_cabinet_set,
      all_info_setup,
      // is_set_extend_membership,
      // is_extend_membership
    },

    
    membership: { my_memberships }
  } = state;
  return {
    branches,
    profile_image,
    username,
    name,
    sel_branch,
    sel_cost_type,
    // sel_cabinet_set,
    all_info_setup,
    my_memberships,
    // is_set_extend_membership,
    // is_extend_membership
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
    },
    // setClearExtendMembership: () =>{
    //   dispatch(registActions.setClearExtendMembership());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
