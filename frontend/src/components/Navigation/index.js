import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {user: {is_superuser, is_staff}} = state;
  return {
    is_superuser,
    is_staff,
  };
};

export default connect(mapStateToProps)(Container);
