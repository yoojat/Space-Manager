import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendMebershipActions } from "redux/modules/extendMembership";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    extendMembership: { membership_extend, sel_cost_type },
    regist: { membership_cost_types }
  } = state;
  return {
    membership_extend,
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
      dispatch(extendMebershipActions.setExtendCostType(sel_cost_type));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
