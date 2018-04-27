import {connect} from 'react-redux';
// import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {sel_cabinet_set},
  } = state;
  return {
    sel_cabinet_set,
  };
};

export default connect(mapStateToProps)(Container);
