import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_member_memberships, now_view_user }
  } = state;

  return { now_view_member_memberships, now_view_user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNowViewMemberships: userid => {
      dispatch(staffActions.fetchNowViewMemberships(userid));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
