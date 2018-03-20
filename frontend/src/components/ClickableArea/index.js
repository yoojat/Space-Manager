import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as seatActions} from 'redux/modules/seat';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRoomSeats: () => {
      dispatch(seatActions.getRoomSeats(ownProps.id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
