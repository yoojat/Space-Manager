import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {branch: {now_branch: {branch: {rooms}}}} = state;
  return {rooms};
};

export default connect(mapStateToProps)(Container);
