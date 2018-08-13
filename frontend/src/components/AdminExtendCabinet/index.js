import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetExtendActions } from "redux/modules/staffCabinetExtend";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetExtend: { sel_cabinet_for_extend, end_datetime }
  } = state;

  return { sel_cabinet_for_extend, end_datetime };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetForStaffExtendCabinet: sel_cabinet => {
      dispatch(
        staffCabinetExtendActions.setCabinetForStaffExtendCabinet(sel_cabinet)
      );
    },
    setExpireDatetimeForStaffExtendCabinet: sel_datetime => {
      dispatch(
        staffCabinetExtendActions.setExpireDatetimeForStaffExtendCabinet(
          sel_datetime
        )
      );
    },
    extendCabinet: () => {
      dispatch(staffCabinetExtendActions.extendCabinet());
    },
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
