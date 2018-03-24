import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {seat: {room, onAssignment}} = state;
  return {
    room,
    onAssignment,
  };
};
export default connect(mapStateToProps)(Container);
