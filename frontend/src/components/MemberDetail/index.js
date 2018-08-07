import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffActions } from "redux/modules/staff";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: {
      now_view_user,
      detail_view_loading,
      seeing_regist_window,
      seeing_cabinet_regist_window,
      now_view_member_seat_logs
    }
  } = state;

  return {
    now_view_user,
    detail_view_loading,
    seeing_regist_window,
    seeing_cabinet_regist_window,
    now_view_member_seat_logs
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSeeingRegistWindowFalse: () => {
      dispatch(staffActions.setSeeingRegistWindowFalse());
    },
    setSeeingCabinetRegistWindowFalse: () => {
      dispatch(staffActions.setSeeingCabinetRegistWindowFalse());
    },
    fetchNowViewMemberSeatHistory: user_id => {
      dispatch(staffActions.fetchNowViewMemberSeatHistory(user_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
