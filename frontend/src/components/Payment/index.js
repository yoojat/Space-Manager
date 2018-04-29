import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as registActions} from 'redux/modules/regist';

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    regist: {
      sel_cabinets,
      sel_branch,
      start_date,
      start_time,
      end_datetime,
      cost_type,
      all_info_setup,
    },
  } = state;
  return {
    sel_branch,
    start_date,
    start_time,
    end_datetime,
    cost_type,
    all_info_setup,
    user,
    sel_cabinets,
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
  };
};

//이름, 등록지점, 시작시각, 만료시각, cost_type(가격, 일수, title)
export default connect(mapStateToProps, mapDispatchToProps)(Container);
