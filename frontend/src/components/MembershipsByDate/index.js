import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { memberships_by_date }
  } = state;

  return { memberships_by_date };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMembershipsByDate: select_date => {
      dispatch(staffActions.fetchMembershipsByDate(select_date));
    },
    fetchNowViewMember: user_id => {
      dispatch(staffActions.fetchNowViewMember(user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
