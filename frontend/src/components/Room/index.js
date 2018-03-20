import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as branchActions} from 'redux/modules/branch';

const mapStateToProp = (state, ownProps) => {
  const {seat: {room}} = state;
  return {
    room,
  };
};
export default connect(mapStateToProp)(Container);
