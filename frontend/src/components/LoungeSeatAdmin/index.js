import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffSeatActions } from "redux/modules/staffSeat";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: { sel_branch_for_seat_man }
  } = state;

  return { sel_branch_for_seat_man };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRoomSeats: room_id => {
      dispatch(staffSeatActions.getRoomSeats(room_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
