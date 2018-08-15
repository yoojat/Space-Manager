import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetShiftActions } from "redux/modules/staffCabinetShift";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetShift: { sel_cabinet_set, target_cabinet, scroll_first }
  } = state;
  return {
    sel_cabinet_set,
    target_cabinet,
    scroll_first
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTargetCabinetForStaffShiftCabinet: sel_cabinet => {
      dispatch(
        staffCabinetShiftActions.setTargetCabinetForStaffShiftCabinet(
          sel_cabinet
        )
      );
    },
    setScrollFirstFalseStaffCabinet: () => {
      dispatch(staffCabinetShiftActions.setScrollFirstFalseStaffCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
