import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {seat: {room}} = state;
  return {
    room,
  };
};
export default connect(mapStateToProps)(Container);
