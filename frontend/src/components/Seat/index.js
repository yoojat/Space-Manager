import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as seatActions} from 'redux/modules/seat';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSeatClick: () => {
      dispatch(seatActions.allocateSeat(ownProps.id, ownProps.roomId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
