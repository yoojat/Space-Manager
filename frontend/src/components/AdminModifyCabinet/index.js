import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetModifyActions } from "redux/modules/staffCabinetModify";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetModify: { sel_cabinet_for_modify }
  } = state;

  return { sel_cabinet_for_modify };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetForStaffModifyCabinet: cabinet => {
      dispatch(
        staffCabinetModifyActions.setCabinetForStaffModifyCabinet(cabinet)
      );
    },
    modifyCabinet: (start_datetime, end_datetime) => {
      dispatch(
        staffCabinetModifyActions.modifyCabinet(start_datetime, end_datetime)
      );
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
