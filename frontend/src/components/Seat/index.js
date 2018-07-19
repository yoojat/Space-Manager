import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as seatActions } from "redux/modules/seat";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { memberships }
  } = state;

  const my_now_using = state.seat.now_using;
  return {
    memberships,
    my_now_using
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSeatClick: () => {
      dispatch(seatActions.allocateSeat(ownProps.id));
    },
    changeSeat: (beforeSeatId, afterSeatId) => {
      dispatch(seatActions.changeSeat(beforeSeatId, afterSeatId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
