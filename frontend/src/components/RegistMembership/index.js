import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';

const mapStateToProps = (state, ownProps) => {
  const {user, regist: {sel_branch}} = state;
  return {
    user,
    sel_branch,
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
