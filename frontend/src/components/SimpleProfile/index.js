import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as branchActions } from "redux/modules/branch";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_user }
  } = state;

  return { now_view_user };
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
