import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_member_memberships }
  } = state;
  return {
    now_view_member_memberships
  };
};

export default connect(mapStateToProps)(Container);
