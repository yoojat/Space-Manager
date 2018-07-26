import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as setupInfoActions } from "redux/modules/setupInfo";
import { actionCreators as paymentActions } from "redux/modules/payment";
const mapStateToProps = (state, ownProps) => {
  const {
    extendMembership,
    enrollCabinet,
    extendCabinet,
    setupInfo: { now_datetime },
    staff: { now_view_member_cabinets }
  } = state;

  return {
    extendMembership,
    enrollCabinet,
    extendCabinet,
    now_datetime,
    my_cabinets: now_view_member_cabinets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setNowDatetime: () => {
      dispatch(setupInfoActions.setNowDatetime());
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
