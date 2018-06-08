import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    membership: { my_memberships }
  } = state;
  return {
    my_memberships
  };
};

export default connect(mapStateToProps)(Container);
