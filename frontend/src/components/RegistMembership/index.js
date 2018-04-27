import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';
import {actionCreators as registActions} from 'redux/modules/regist';

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    regist: {sel_branch, start_date, start_time, cost_type, all_info_setup},
  } = state;
  return {
    user,
    sel_branch,
    start_date,
    start_time,
    cost_type,
    all_info_setup,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembership: userid => {
      dispatch(userActions.setMembership(userid));
    },
    setAllInfoSetup: () => {
      dispatch(registActions.setAllInfoSetup());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
