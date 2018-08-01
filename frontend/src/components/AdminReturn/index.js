import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as seatStaffActions } from "redux/modules/staffSeat";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: { sel_seat_for_seat_man, sel_user_for_seat_man }
  } = state;

  return { sel_seat_for_seat_man, sel_user_for_seat_man };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    superReturnSeat: seatId => {
      dispatch(seatStaffActions.superReturnSeat(seatId));
    },
    getUserForAllocate: user_id => {
      dispatch(seatStaffActions.getUserForAllocate(user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
