import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as paymentActions } from "redux/modules/payment";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership,
    extendMembership,
    enrollCabinet,
    extendCabinet,
    cabinet: { my_cabinets },
    user: { name, phone }
  } = state;

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
    payCheck: (imp_uid, pay_amount) => {
      dispatch(paymentActions.payCheck(imp_uid, pay_amount));
    },
    fetchPaymethods: () => {
      dispatch(paymentActions.fetchPaymethods());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
