import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { use_cabinet, sel_branch, all_info_setup, sel_cost_type }
  } = state;
  return {
    use_cabinet,
    sel_branch,
    all_info_setup,
    sel_cost_type
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUseCabinet: () => {
      dispatch(registActions.setUseCabinet());
    },
    setUseNoCabinet: () => {
      dispatch(registActions.setUseNoCabinet());
    },
    setSelCabinetSetId: sel_cabinet_set_id => {
      dispatch(registActions.setSelCabinetSetId(sel_cabinet_set_id));
    },
    clearSelCabinets: () => {
      dispatch(registActions.clearSelCabinets());
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
