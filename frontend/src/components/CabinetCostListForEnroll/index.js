import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: {
      sel_cabinet_cost_type,
      sel_start_datetime,
      sel_end_datetime,
      setEndDatetime,
      all_info_complete
    }
  } = state;

  return {
    sel_cabinet_cost_type,
    sel_start_datetime,
    sel_end_datetime,
    setEndDatetime,
    all_info_complete
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetCostType: cabinet_cost_type => {
      dispatch(enrollCabinetActions.setCabinetCostType(cabinet_cost_type));
    },
    setEndDatetime: sel_end_datetime => {
      dispatch(enrollCabinetActions.setEndDatetime(sel_end_datetime));
    },
    enrollCabinetAllInfoSetup: () => {
      dispatch(enrollCabinetActions.enrollCabinetAllInfoSetup());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
