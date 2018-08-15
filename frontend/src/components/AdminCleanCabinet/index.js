import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";
import { actionCreators as staffCabinetClean } from "redux/modules/staffCabinetClean";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_cabinet, sel_cabinet_set },
    staffCabinetClean: { sel_cabinet_for_clean }
  } = state;

  return {
    sel_cabinet,
    sel_cabinet_set,
    sel_cabinet_for_clean
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    },
    setCabinetForStaffCleanCabinet: cabinet => {
      dispatch(staffCabinetClean.setCabinetForStaffCleanCabinet(cabinet));
    },
    cleanCabinet: () => {
      dispatch(staffCabinetClean.cleanCabinet());
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
