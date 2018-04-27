import {connect} from 'react-redux';
import {actionCreators as registActions} from 'redux/modules/regist';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    regist: {cost_type, membership_cost_types, start_date, start_time},
  } = state;
  return {
    cost_type,
    membership_cost_types,
    start_date,
    start_time,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCostType: cost_type => {
      dispatch(registActions.setSelCostType(cost_type));
    },
    getMembershipCostTypes: () => {
      dispatch(registActions.getMembershipCostTypes());
    },
    setSelEndDateTime: end_datetime => {
      dispatch(registActions.setSelEndDateTime(end_datetime));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
