import {connect} from 'react-redux';
import {actionCreators as branchActions} from 'redux/modules/branch';
import Container from './container';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBranches: () => {
      dispatch(branchActions.getBranches());
    },
  };
};
export default connect(null, mapDispatchToProps)(Container);
