import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_cabinet_set, temp_cabinet_set }
  } = state;
  return {
    sel_cabinet_set,
    temp_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinetActions.fetchSelCabinetSet(sel_cabinet_set_id));
    },
    resetTempCabinetSet: () => {
      dispatch(staffCabinetActions.resetTempCabinetSetStaffCabinet());
    },
    setTempCabinetSet: temp_cabinet_set => {
      dispatch(
        staffCabinetActions.setTempCabinetSetStaffCabinet(temp_cabinet_set)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
