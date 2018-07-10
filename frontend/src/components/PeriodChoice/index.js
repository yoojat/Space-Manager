import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: {
      start_datetime,
      membership_cost_types,
      sel_cost_type,
      end_datetime,
      all_info_setup
    }
  } = state;
  return {
    start_datetime,
    membership_cost_types,
    sel_cost_type,
    end_datetime,
    all_info_setup
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelCostType: sel_cost_type => {
      dispatch(enrollMembershipActions.setSelCostType(sel_cost_type));
    },
    setSelEnrollMembershipEndDateTime: sel_end_datetime => {
      dispatch(
        enrollMembershipActions.setSelEnrollMembershipEndDateTime(
          sel_end_datetime
        )
      );
    }
    // setAllInfoSetup: () => {
    //   dispatch(enrollMembershipActions.setAllInfoSetup());
    // },
    // setAllInfoNotSetup: () => {
    //   dispatch(enrollMembershipActions.setAllInfoNotSetup());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
