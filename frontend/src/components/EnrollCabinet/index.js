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
    }
  } = state;

  return { sel_cost_type, sel_branch, sel_cabinet_set, cabinets_to_enroll, all_info_complete };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCostType: sel_cabinet_cost => {
      dispatch(enrollCabinetActions.setCostType(sel_cabinet_cost));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
