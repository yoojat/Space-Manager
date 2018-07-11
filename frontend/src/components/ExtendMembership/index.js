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
    user: { profile_image, username, name },
    membership: { my_memberships },
    extendMembership: {
      membership_extend,
      sel_cost_type,
      extend_membership_info_setup
    },
    cabinet: { my_cabinets },
    enrollCabinet: {
      cabinets_to_enroll,
      is_enroll_cabinet,
      showEnrollCabinet_is_first,
      all_info_complete,
      sel_cabinet_cost_type
    },
    extendCabinet: { sel_cabinet_costtype },
    setupInfo: { extendMembershipComplete }
  } = state;
  return {
    profile_image,
    username,
    name,
    my_memberships,
    membership_extend,
    sel_cost_type,
    my_cabinets,
    cabinets_to_enroll,
    is_enroll_cabinet,
    showEnrollCabinet_is_first,
    membership_extend_complete: extend_membership_info_setup,
    cabinet_enroll_complete: all_info_complete,
    extendMembershipComplete,
    sel_cabinet_cost_type,
    sel_cabinet_costtype
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
    setExtendMembershipInfoSetup: () => {
      dispatch(extendMembershipActions.setExtendMembershipInfoSetup());
    },
    setExtendMembershipInfoNotSetup: () => {
      dispatch(extendMembershipActions.setExtendMembershipInfoNotSetup());
    },
    SetShowEnrollCabinetIsFirstFalse: () => {
      dispatch(enrollCabinetActions.SetShowEnrollCabinetIsFirstFalse());
    },
    fetchSelBranch: branch_id => {
      dispatch(enrollCabinetActions.fetchSelBranch(branch_id));
    },
    resetEnrollCabinet: () => {
      dispatch(enrollCabinetActions.resetEnrollCabinet());
    },
    setExtendMembershipComplete: () => {
      dispatch(setupInfoActions.setExtendMembershipComplete());
    },
    setExtendMembershipNotComplete: () => {
      dispatch(setupInfoActions.setExtendMembershipNotComplete());
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
    clearEnrollMembership: () => {
      dispatch(enrollMembershipActions.clearEnrollMembership());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
