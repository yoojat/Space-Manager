import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";
import { actionCreators as membershipActions } from "redux/modules/membership";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import { actionCreators as extendMembershipActions } from "redux/modules/extendMembership";
import { actionCreators as setupInfoActions } from "redux/modules/setupInfo";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    user: { profile_image, username, name },
    user,
    enrollMembership: { sel_branch, sel_cost_type, all_info_setup },
    membership: { my_memberships },
    cabinet: { my_cabinets },
    enrollCabinet: {
      is_enroll_cabinet,
      showEnrollCabinet_is_first,
      sel_cabinet_cost_type,
      sel_start_datetime,
      cabinets_to_enroll
    },
    setupInfo: { enrollMembershipComplete }
  } = state;

  const sel_extend_cabinet_cost_type = state.extendCabinet.sel_cabinet_costtype;
  return {
    branches,
    profile_image,
    username,
    name,
    sel_branch,
    sel_cost_type,
    all_info_setup,
    my_memberships,
    my_cabinets,
    is_enroll_cabinet,
    showEnrollCabinet_is_first,
    enrollMembershipComplete,
    sel_cabinet_cost_type,
    sel_start_datetime,
    cabinets_to_enroll,
    user,
    sel_extend_cabinet_cost_type
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
    setIsEnrollCabinet: () => {
      dispatch(enrollCabinetActions.setIsEnrollCabinet());
    },
    setIsEnrollCabinetNo: () => {
      dispatch(enrollCabinetActions.setIsEnrollCabinetNo());
    },
    fetchSelBranch: sel_branch_id => {
      dispatch(enrollCabinetActions.fetchSelBranch(sel_branch_id));
    },
    clearEnrollMembership: () => {
      dispatch(enrollMembershipActions.clearEnrollMembership());
    },

    // setEnrollMembershipInfoSetup: () => {
    //   dispatch(enrollMembershipActions.setAllInfoSetup());
    // },
    // setEnrollMembershipInfoNotSetup: () => {
    //   dispatch(enrollMembershipActions.setAllInfoNotSetup());
    // },
    SetShowEnrollCabinetIsFirstFalse: () => {
      dispatch(enrollCabinetActions.SetShowEnrollCabinetIsFirstFalse());
    },
    setEnrollMembershipComplete: () => {
      dispatch(setupInfoActions.setEnrollMembershipComplete());
    },
    setEnrollMembershipNotComplete: () => {
      dispatch(setupInfoActions.setEnrollMembershipNotComplete());
    },
    clearSelCabinetInfo: () => {
      dispatch(enrollCabinetActions.clearSelCabinetInfo());
    },
    clearExtendMembership: () => {
      dispatch(extendMembershipActions.clearExtendMembership());
    },
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    },
    clearEnrollCabinet: () => {
      dispatch(enrollCabinetActions.clearEnrollCabinet());
    },
    setEnrollMembershipTargetUser: target_user => {
      dispatch(
        enrollMembershipActions.setEnrollMembershipTargetUser(target_user)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
