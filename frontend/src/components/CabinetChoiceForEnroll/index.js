import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: { sel_cabinet_set, cabinets_to_enroll, sel_start_datetime },
    cabinet: { my_cabinets }
  } = state;
  return {
    sel_cabinet_set,
    cabinets_to_enroll,
    my_cabinets,
    sel_start_datetime
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCabinetToEnroll: sel_cabinet => {
      dispatch(enrollCabinetActions.addCabinetToEnroll(sel_cabinet));
    },
    setStartDatetime: sel_date_time => {
      dispatch(enrollCabinetActions.setStartDatetime(sel_date_time));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
