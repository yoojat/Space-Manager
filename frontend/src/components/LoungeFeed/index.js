import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as branchActions} from 'redux/modules/branch';

const mapStateToProp = (state, ownProps) => {
  const {branch: {now_branch}} = state;
  return {
    now_branch,
  };
};

// dispatch는 액션을 리듀서로 보내는 function
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBranch: () => {
      dispatch(branchActions.getBranch());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Container);
