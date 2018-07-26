import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: {
      sel_cost_type,
      sel_branch,
      sel_cabinet_set,
      cabinets_to_enroll,
      all_info_complete
    },
    staff: { now_view_user },
    user
  } = state;

  return {
    sel_cost_type,
    sel_branch,
    sel_cabinet_set,
    cabinets_to_enroll,
    all_info_complete,
    user,
    now_view_user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCostType: sel_cabinet_cost => {
      dispatch(enrollCabinetActions.setCostType(sel_cabinet_cost));
    },
    setEnrollCabinetTargetUser: target_user => {
      dispatch(enrollCabinetActions.setEnrollCabinetTargetUser(target_user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
