import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: {
      sel_cabinet_set,
      cabinets_to_enroll,
      sel_start_datetime,
      scroll_first
    },
    cabinet: { my_cabinets }
  } = state;
  return {
    sel_cabinet_set,
    cabinets_to_enroll,
    my_cabinets,
    sel_start_datetime,
    scroll_first
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCabinetToEnroll: sel_cabinet => {
      dispatch(enrollCabinetActions.addCabinetToEnroll(sel_cabinet));
    },
    setEnrollCabinetStartDatetime: sel_date_time => {
      dispatch(
        enrollCabinetActions.setEnrollCabinetStartDatetime(sel_date_time)
      );
    },
    setScrollFirstFalse: () => {
      dispatch(enrollCabinetActions.setScrollFirstFalse());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
