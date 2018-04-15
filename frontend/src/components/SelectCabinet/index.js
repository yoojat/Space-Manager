import {connect} from 'react-redux';
// import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {sel_branch},
  } = state;
  return {
    sel_branch,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     setSelCostType: cost_type => {
//       dispatch(registActions.setSelCostType(cost_type));
//     },
//     getMembershipCostTypes: () => {
//       dispatch(registActions.getMembershipCostTypes());
//     },
//   };
// };

export default connect(mapStateToProps)(Container);
