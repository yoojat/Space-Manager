import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as branchActions } from "redux/modules/branch";
// import { actionCreators as registActions } from "redux/modules/regist";

// const mapStateToProps = (state, ownProps) => {
//   const {} = state;

//   return {};
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
// getBranch: branchId => {
//   dispatch(registActions.getBranch(branchId));
// },
//   };
// };

export default connect()(Container);
// mapStateToProps,
// mapDispatchToProps
