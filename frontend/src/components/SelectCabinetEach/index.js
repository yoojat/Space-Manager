import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {sel_cabinet_set, sel_cabinets, all_info_setup},
  } = state;
  return {
    sel_cabinet_set,
    sel_cabinets,
    all_info_setup,
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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
