import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: { temp_cabinet_set, sel_cabinet_set }
  } = state;

  return { temp_cabinet_set, sel_cabinet_set };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetTempCabinetSet: () => {
      dispatch(enrollCabinetActions.resetTempCabinetSet());
    },
    setTempCabinetSet: temp_cabinet_set => {
      dispatch(enrollCabinetActions.setTempCabinetSet(temp_cabinet_set));
    },
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(enrollCabinetActions.fetchSelCabinetSet(sel_cabinet_set_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
