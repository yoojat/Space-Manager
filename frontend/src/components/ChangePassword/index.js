import {connect} from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {user: {username}} = state;
  return {
    username,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//       getRoomSeats: () => {
//         dispatch(seatActions.getRoomSeats(ownProps.id));
//       },
//     };
//   };

export default connect(mapStateToProps)(Container);
