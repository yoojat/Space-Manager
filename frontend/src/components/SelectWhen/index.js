import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {start_date},
  } = state;
  return {
    start_date,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelDateStart: start_date => {
      dispatch(registActions.setSelDateStart(start_date));
    },

    setSelTimeStart: start_time => {
      dispatch(registActions.setSelTimeStart(start_time));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
