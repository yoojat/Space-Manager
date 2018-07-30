import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: { sel_branch_for_seat_man }
  } = state;
  return {
    branch: sel_branch_for_seat_man
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getMinimapBranch: () => {
//       dispatch(minimapActions.getMinimapBranch());
//     }
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Container);
