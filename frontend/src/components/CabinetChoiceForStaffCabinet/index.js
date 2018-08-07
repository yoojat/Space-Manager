import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_cabinet_set, sel_cabinet, scroll_first }
  } = state;
  return {
    sel_cabinet_set,
    sel_cabinet,
    scroll_first
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCabinetStaffCabinet: sel_cabinet => {
      dispatch(staffCabinetActions.setSelCabinetStaffCabinet(sel_cabinet));
    },
    setScrollFirstFalseStaffCabinet: () => {
      dispatch(staffCabinetActions.setScrollFirstFalseStaffCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
