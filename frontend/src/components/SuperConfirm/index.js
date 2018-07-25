import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as paymentActions } from "redux/modules/payment";

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
