import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetShiftActions } from "redux/modules/staffCabinetShift";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetShift: { sel_cabinet_set, temp_cabinet_set }
  } = state;
  return {
    sel_cabinet_set,
    temp_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinetShiftActions.fetchSelCabinetSet(sel_cabinet_set_id));
    },
    resetTempCabinetSetForStaffShiftCabinet: () => {
      dispatch(
        staffCabinetShiftActions.resetTempCabinetSetForStaffShiftCabinet()
      );
    },
    setTempCabinetSetForStaffShiftCabinet: temp_cabinet_set => {
      dispatch(
        staffCabinetShiftActions.setTempCabinetSetForStaffShiftCabinet(
          temp_cabinet_set
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
