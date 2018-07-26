import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: { star_datetime, membership_cost_types, sel_cost_type }
  } = state;
  return {
    star_datetime,
    membership_cost_types,
    sel_cost_type
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setEnrollMembershipStartDatetime: start_datetime => {
      dispatch(
        enrollMembershipActions.setEnrollMembershipStartDatetime(start_datetime)
      );
    },
    fetchMembershipCostTypes: fetchMembershipCostTypes => {
      dispatch(registActions.fetchMembershipCostTypes());
    },
    setSelEnrollMembershipEndDateTime: sel_end_datetime => {
      dispatch(
        enrollMembershipActions.setSelEnrollMembershipEndDateTime(
          sel_end_datetime
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
