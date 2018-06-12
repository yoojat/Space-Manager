import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as branchActions } from "redux/modules/branch";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: {
      membership_to_extended,
      sel_cost_type,
      will_extend_cabinet,
      cabinets_to_extended,
      sel_cabinet_cost_type,
      all_info_setup
    }
  } = state;

  return {
    membership_to_extended,
    sel_cost_type,
    will_extend_cabinet,
    cabinets_to_extended,
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
