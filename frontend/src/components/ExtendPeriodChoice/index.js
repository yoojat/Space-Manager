import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendActions } from "redux/modules/extend";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: { membership_to_extended, sel_cost_type },
    regist: { membership_cost_types }
  } = state;
  return {
    membership_to_extended,
    membership_cost_types,
    sel_cost_type
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMembershipCostTypes: () => {
      dispatch(registActions.fetchMembershipCostTypes());
    },
    setExtendCostType: sel_cost_type => {
      dispatch(extendActions.setExtendCostType(sel_cost_type));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
