import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { sel_cabinet_set, sel_cabinets }
  } = state;
  return {
    sel_cabinet_set,
    sel_cabinets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCabinet: sel_cabinet => {
      dispatch(registActions.setSelCabinet(sel_cabinet));
    },
    unsetSelCabinet: sel_cabinet => {
      dispatch(registActions.unsetSelCabinet(sel_cabinet));
    },
    setAllInfoSetup: () => {
      dispatch(registActions.setAllInfoSetup());
    },
    setAllInfoNotSetup: () => {
      dispatch(registActions.setAllInfoNotSetup());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
