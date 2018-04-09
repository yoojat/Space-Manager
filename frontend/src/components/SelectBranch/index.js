import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as branchActions} from 'redux/modules/branch';
import {actionCreators as registActions} from 'redux/modules/regist';

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
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },
    setSelBranchId: branchId => {
      dispatch(registActions.setSelBranchId(branchId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
