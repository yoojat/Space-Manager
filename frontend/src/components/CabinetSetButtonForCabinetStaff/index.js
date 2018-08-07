import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { temp_cabinet_set, sel_cabinet_set }
  } = state;

  return { temp_cabinet_set, sel_cabinet_set };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetTempCabinetSet: () => {
      dispatch(staffCabinetActions.resetTempCabinetSetStaffCabinet());
    },
    setTempCabinetSet: temp_cabinet_set => {
      dispatch(
        staffCabinetActions.setTempCabinetSetStaffCabinet(temp_cabinet_set)
      );
    },
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinetActions.fetchSelCabinetSet(sel_cabinet_set_id));
    },
    clearCabinetSet: () => {
      dispatch(staffCabinetActions.clearCabinetSet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
