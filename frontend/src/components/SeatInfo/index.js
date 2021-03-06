import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as branchActions } from "redux/modules/branch";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staffSeat: {
      sel_branch_for_seat_man,
      sel_seat_for_seat_man,
      sel_room_for_seat_man
    }
  } = state;

  return {
    sel_branch_for_seat_man,
    sel_seat_for_seat_man,
    sel_room_for_seat_man
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
