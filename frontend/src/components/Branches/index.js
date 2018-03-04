import {connect} from 'react-redux';
import {actionCreators as branchActions} from 'redux/modules/branch';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {branch: {branches}} = state;
  return {
    branches,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBranches: () => {
      dispatch(branchActions.getBranches());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
