import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {start_date, cost_type, start_time},
  } = state;
  return {
    start_date,
    start_time,
    cost_type,
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
    setSelEndDateTime: end_datetime => {
      dispatch(registActions.setSelEndDateTime(end_datetime));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
