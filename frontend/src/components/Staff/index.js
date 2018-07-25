import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as staffActions } from "redux/modules/staff";

// const mapStateToProps = (state, ownProps) => {
//   const {} = state;

//   return {};
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     // fetchTodayMemberships: () => {
//     //   dispatch(staffActions.fetchTodayMemberships());
//     // }
//   };
// };

export default connect()(Container);
// mapStateToProps,
// mapDispatchToProps
