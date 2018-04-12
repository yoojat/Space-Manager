import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {regist: {start_date}} = state;
  return {
    start_date,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelWhenStart: start_date => {
      dispatch(registActions.setSelWhenStart(start_date));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
