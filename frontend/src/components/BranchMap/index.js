import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {branch: {branches}} = state;
  return {
    branches,
  };
};

export default connect(mapStateToProps)(Container);
