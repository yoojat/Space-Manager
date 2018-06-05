import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    branch: { now_branch }
  } = state;
  return {
    branch: now_branch.branch
  };
};

export default connect(mapStateToProps)(Container);
