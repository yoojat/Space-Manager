import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { memberships_by_date, now_view_user }
  } = state;

  return { memberships_by_date, now_view_user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTodayMemberships: () => {
      dispatch(staffActions.fetchTodayMemberships());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
