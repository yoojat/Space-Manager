import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    minimap: { now_branch }
  } = state;
  return {
    branch: now_branch.branch
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
