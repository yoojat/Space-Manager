import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffSeatActions } from "redux/modules/staffSeat";

// import { actionCreators as seatActions } from "redux/modules/seat";

// const mapStateToProps = (state, ownProps) => {
//   const {} = state;

//   return {};
// };
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSeatInfo: () => {
      dispatch(staffSeatActions.getSeatInfo(ownProps.id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
// mapStateToProps,
// mapDispatchToProps
