import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: {
      now_view_user,
      detail_view_loading,
      seeing_regist_window,
      seeing_cabinet_regist_window
    }
  } = state;

  return {
    now_view_user,
    detail_view_loading,
    seeing_regist_window,
    seeing_cabinet_regist_window
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
