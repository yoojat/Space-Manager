import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";
import { actionCreators as staffCabinetExpire } from "redux/modules/staffCabinetExpire";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_cabinet, sel_cabinet_set },
    staffCabinetExpire: { sel_cabinet_for_expire }
  } = state;

  return {
    sel_cabinet,
    sel_cabinet_set,
    sel_cabinet_for_expire
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    },
    setCabinetForStaffExpireCabinet: cabinet => {
      dispatch(staffCabinetExpire.setCabinetForStaffExpireCabinet(cabinet));
    },
    expireCabinet: () => {
      dispatch(staffCabinetExpire.expireCabinet());
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
