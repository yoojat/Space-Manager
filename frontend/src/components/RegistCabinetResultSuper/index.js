import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as setupInfoActions } from "redux/modules/setupInfo";

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
