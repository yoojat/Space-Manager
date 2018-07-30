import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: { sel_room_for_seat_man }
  } = state;
  return {
    sel_room_for_seat_man
  };
};
export default connect(mapStateToProps)(Container);
