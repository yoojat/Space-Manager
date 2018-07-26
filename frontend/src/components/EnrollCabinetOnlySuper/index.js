import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as extendMembershipActions } from "redux/modules/extendMembership";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";
import { actionCreators as branchActions } from "redux/modules/branch";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    enrollCabinet: {
      sel_cabinet_cost_type,
      sel_branch,
      sel_cabinet_set,
      cabinets_to_enroll,
      all_info_complete
    },
    staff: { now_view_user }
  } = state;

  return {
    sel_cabinet_cost_type,
    sel_branch,
    sel_cabinet_set,
    cabinets_to_enroll,
    all_info_complete,
    user: now_view_user,
    branches
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBranches: () => {
      dispatch(branchActions.fetchBranches());
    },
    setCostType: sel_cabinet_cost => {
      dispatch(enrollCabinetActions.setCostType(sel_cabinet_cost));
    },
    setEnrollCabinetTargetUser: target_user => {
      dispatch(enrollCabinetActions.setEnrollCabinetTargetUser(target_user));
    },
    clearEnrollMembership: () => {
      dispatch(enrollMembershipActions.clearEnrollMembership());
    },
    clearExtendMembership: () => {
      dispatch(extendMembershipActions.clearExtendMembership());
    },
    clearEnrollCabinet: () => {
      dispatch(enrollCabinetActions.clearEnrollCabinet());
    },
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
