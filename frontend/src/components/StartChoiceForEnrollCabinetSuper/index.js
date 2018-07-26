import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: {
      sel_cabinet_cost_type,
      sel_start_datetime,
      sel_end_datetime,
      cabinet_cost_types,
      cabinets_to_enroll
    }
  } = state;
  return {
    sel_cabinet_cost_type,
    sel_start_datetime,
    sel_end_datetime,
    cabinet_cost_types,
    cabinets_to_enroll
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setEnrollCabinetStartDatetime: start_datetime => {
      dispatch(
        enrollCabinetActions.setEnrollCabinetStartDatetime(start_datetime)
      );
    },
    fetchCabinetCostTypes: () => {
      dispatch(enrollCabinetActions.fetchCabinetCostTypes());
    },
    setEndDatetime: sel_end_datetime => {
      dispatch(enrollCabinetActions.setEndDatetime(sel_end_datetime));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
