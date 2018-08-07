import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { found_users }
  } = state;

  return { found_users };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSearchedMembers: (keyword, scope) => {
      dispatch(staffActions.fetchSearchedMembers(keyword, scope));
    },
    fetchNowViewMember: user_id => {
      dispatch(staffActions.fetchNowViewMember(user_id));
    },
    fetchNowViewMemberSeatHistory: user_id => [
      dispatch(staffActions.fetchNowViewMemberSeatHistory(user_id))
    ]
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
