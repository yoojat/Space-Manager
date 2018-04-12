import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {regist: {days, membership_cost_types}} = state;
  return {
    days,
    membership_cost_types,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelDays: days => {
      dispatch(registActions.setSelDays(days));
    },
    getMembershipCostTypes: () => {
      dispatch(registActions.getMembershipCostTypes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
