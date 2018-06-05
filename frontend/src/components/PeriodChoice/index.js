import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {
      start_datetime,
      membership_cost_types,
      sel_cost_type,
      end_datetime,
      all_info_setup
    }
  } = state;
  return {
    start_datetime,
    membership_cost_types,
    sel_cost_type,
    end_datetime,
    all_info_setup
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCostType: sel_cost_type => {
      dispatch(registActions.setSelCostType(sel_cost_type));
    },
    setSelEndDateTime: sel_end_datetime => {
      dispatch(registActions.setSelEndDateTime(sel_end_datetime));
    },
    setAllInfoSetup: () => {
      dispatch(registActions.setAllInfoSetup());
    },
    setAllInfoNotSetup: () => {
      dispatch(registActions.setAllInfoNotSetup());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
