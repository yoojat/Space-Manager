import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as seatActions } from "redux/modules/seat";
import { actionCreators as branchActions } from "redux/modules/branch";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { memberships, id, profile_image, username, name },
    seat: { now_using, room }
  } = state;

  // const roomId = state.room.id;
  return {
    memberships,
    now_using,
    id,
    room,
    profile_image,
    username,
    name
    // roomId
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembership: () => {
      dispatch(userActions.setMembership());
    },
    getRoomSeats: roomId => {
      dispatch(seatActions.getRoomSeats(roomId));
    },
    returnSeat: userId => {
      dispatch(seatActions.returnSeat(userId));
    },
    getBranch: () => {
      dispatch(branchActions.getBranch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
