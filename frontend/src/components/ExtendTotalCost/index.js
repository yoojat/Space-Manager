import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as branchActions } from "redux/modules/branch";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    extendMembership: {
      membership_extend,
      sel_cost_type,
      sel_cabinet_cost_type,
      all_info_setup
    }
  } = state;

  return {
    membership_extend,
    sel_cost_type,
    sel_cabinet_cost_type,
    all_info_setup
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
