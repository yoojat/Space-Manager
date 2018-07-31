import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffSeatActions } from "redux/modules/staffSeat";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: { searched_members }
  } = state;

  return { searched_members };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersBySearch: keyword => {
      dispatch(staffSeatActions.getUsersBySearch(keyword));
    },
    setSearchedMembersNull: () => {
      dispatch(staffSeatActions.setSearchedMembersNull());
    },
    getUserForAllocate: user_id => {
      dispatch(staffSeatActions.getUserForAllocate(user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
