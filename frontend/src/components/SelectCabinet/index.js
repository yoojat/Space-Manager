import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {sel_branch, all_info_setup, sel_cabinet_set_id, sel_cabinet_set},
  } = state;
  return {
    sel_branch,
    all_info_setup,
    sel_cabinet_set_id,
    sel_cabinet_set,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCabinetSetId: sel_cabinet_set_id => {
      dispatch(registActions.setSelCabinetSetId(sel_cabinet_set_id));
    },
    getCabinetSet: cabinet_set_id => {
      dispatch(registActions.getCabinetSet(cabinet_set_id));
    },
    setAllInfoNotSetup: () => {
      dispatch(registActions.setAllInfoNotSetup());
    },
    setAllInfoSetup: () => {
      dispatch(registActions.setAllInfoSetup());
    },
    clearSelCabinets: () => {
      dispatch(registActions.clearSelCabinets());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
