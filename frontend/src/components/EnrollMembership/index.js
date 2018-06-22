import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as branchActions } from "redux/modules/branch";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";
import { actionCreators as membershipActions } from "redux/modules/membership";
import { actionCreators as enrollCabinetActions } from 'redux/modules/enrollCabinet'

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { branches },
    user: { profile_image, username, name },
    enrollMembership: { sel_branch, sel_cost_type, all_info_setup },
    membership: { my_memberships },
    cabinet: { my_cabinets },
    enrollCabinet: { is_enroll_cabinet }
  } = state;
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
    is_enroll_cabinet
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
      dispatch(enrollCabinetActions.setIsEnrollCabinet())
    },
    setIsEnrollCabinetNo: () => {
      dispatch(enrollCabinetActions.setIsEnrollCabinetNo());
    },
    fetchSelBranch: (sel_branch_id) => {
      dispatch(enrollCabinetActions.fetchSelBranch(sel_branch_id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
