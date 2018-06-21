import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: { star_datetime, membership_cost_types, sel_cost_type }
  } = state;
  return {
    star_datetime,
    membership_cost_types,
    sel_cost_type
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setStartDatetime: start_datetime => {
      dispatch(registActions.setStartDatetime(start_datetime));
    },
    fetchMembershipCostTypes: fetchMembershipCostTypes => {
      dispatch(registActions.fetchMembershipCostTypes());
    },
    setSelEndDateTime: sel_end_datetime => {
      dispatch(registActions.setSelEndDateTime(sel_end_datetime));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
