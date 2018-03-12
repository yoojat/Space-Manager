import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {user: {is_staff}} = state;
  const {user: {is_superuser}} = state;

  return {
    is_staff,
    is_superuser,
  };
};

export default connect(mapStateToProps)(Container);
