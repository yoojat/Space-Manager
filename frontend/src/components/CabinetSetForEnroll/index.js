import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: { sel_cabinet_set, cabinets_to_enroll, temp_cabinet_set }
  } = state;
  return {
    sel_cabinet_set,
    cabinets_to_enroll,
    temp_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(enrollCabinetActions.fetchSelCabinetSet(sel_cabinet_set_id));
    },
    resetTempCabinetSet: () => {
      dispatch(enrollCabinetActions.resetTempCabinetSet());
    },
    setTempCabinetSet: temp_cabinet_set => {
      dispatch(enrollCabinetActions.setTempCabinetSet(temp_cabinet_set));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
