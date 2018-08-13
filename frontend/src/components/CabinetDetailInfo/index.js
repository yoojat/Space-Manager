import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: {
      sel_cabinet,
      sel_cabinet_detail,
      window_show,
      sel_cabinet_set
    }
  } = state;

  return { sel_cabinet, sel_cabinet_detail, window_show, sel_cabinet_set };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCabinetDetail: cabinet_id => {
      dispatch(staffCabinetActions.getCabinetDetail(cabinet_id));
    },
    setWindowShowTrue: () => {
      dispatch(staffCabinetActions.setWindowShowTrue());
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
