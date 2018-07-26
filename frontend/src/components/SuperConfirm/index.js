import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as paymentActions } from "redux/modules/payment";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership,
    extendMembership,
    enrollCabinet,
    extendCabinet,
    staff: {
      now_view_user: { name, phone }
    }
  } = state;

  const my_cabinets = state.staff.now_view_member_cabinets;

  return {
    enrollMembership,
    extendMembership,
    enrollCabinet,
    extendCabinet,
    my_cabinets,
    name,
    phone
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    enrollProcessing: () => {
      dispatch(paymentActions.enrollProcessing());
    },
    setSeeingRegistWindowFalse: () => {
      dispatch(staffActions.setSeeingRegistWindowFalse());
    },
    setSeeingCabinetRegistWindowFalse: () => {
      dispatch(staffActions.setSeeingCabinetRegistWindowFalse());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
