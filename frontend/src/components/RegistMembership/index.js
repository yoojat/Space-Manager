import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    regist: {sel_branch, start_date, start_time, cost_type},
  } = state;
  return {
    user,
    sel_branch,
    start_date,
    start_time,
    cost_type,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembership: userid => {
      dispatch(userActions.setMembership(userid));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
