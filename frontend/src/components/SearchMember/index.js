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
    fetchSearchedMembers: keyword => {
      dispatch(staffActions.fetchSearchedMembers(keyword));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
