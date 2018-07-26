import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_user }
  } = state;

  return { now_view_user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSeeingRegistWindowTrue: () => {
      dispatch(staffActions.setSeeingRegistWindowTrue());
    },
    setSeeingCabinetRegistWindowTrue: () => {
      dispatch(staffActions.setSeeingCabinetRegistWindowTrue());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
