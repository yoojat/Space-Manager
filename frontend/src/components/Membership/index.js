import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from 'redux/modules/user';
import {actionCreators as cabinetActions} from 'redux/modules/cabinet';

const mapStateToProps = (state, ownProps) => {
  const {user, cabinet} = state;
  return {
    user,
    cabinet,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembership: userid => {
      dispatch(userActions.setMembership(userid));
    },
    setUsingCabinet: () => {
      dispatch(cabinetActions.getUsingCabinets());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
