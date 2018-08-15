import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";
import { actionCreators as staffCabinetShift } from "redux/modules/staffCabinetShift";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_cabinet, sel_cabinet_set },
    staffCabinetShift: { sel_cabinet_for_shift, sel_branch, target_cabinet }
  } = state;

  return {
    sel_cabinet,
    sel_cabinet_set,
    sel_cabinet_for_shift,
    sel_branch,
    target_cabinet
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    },
    setCabinetForStaffShiftCabinet: cabinet => {
      dispatch(staffCabinetShift.setCabinetForStaffShiftCabinet(cabinet));
    },

    fetchSelCabinetSet: async cabinet_set_id => {
      await dispatch(staffCabinetActions.fetchSelCabinetSet(cabinet_set_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
