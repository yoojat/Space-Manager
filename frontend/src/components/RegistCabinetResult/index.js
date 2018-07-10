import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as setupInfoActions } from "redux/modules/setupInfo";
import { actionCreators as paymentActions } from "redux/modules/payment";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership,
    enrollCabinet,
    extendCabinet,
    setupInfo: { now_datetime }
  } = state;

  return {
    enrollMembership,
    enrollCabinet,
    extendCabinet,
    now_datetime
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNowDatetime: () => {
      dispatch(setupInfoActions.setNowDatetime());
    },
    payCheck: (merchant_uid, pay_amount) => {
      dispatch(paymentActions.payCheck(merchant_uid, pay_amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
