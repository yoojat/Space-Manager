import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetShiftActions } from "redux/modules/staffCabinetShift";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetShift: { temp_cabinet_set, sel_cabinet_set }
  } = state;

  return { temp_cabinet_set, sel_cabinet_set };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetTempCabinetSet: () => {
      dispatch(
        staffCabinetShiftActions.resetTempCabinetSetForStaffShiftCabinet()
      );
    },
    setTempCabinetSet: temp_cabinet_set => {
      dispatch(
        staffCabinetShiftActions.setTempCabinetSetForStaffShiftCabinet(
          temp_cabinet_set
        )
      );
    },
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinetShiftActions.fetchSelCabinetSet(sel_cabinet_set_id));
    },
    clearCabinetSet: () => {
      dispatch(staffCabinetShiftActions.clearCabinetSetForStaffShiftCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
