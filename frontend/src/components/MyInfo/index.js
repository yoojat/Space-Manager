import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as membershipActions } from "redux/modules/membership";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    membership: { my_memberships },
    cabinet: { my_cabinets },
    user: { profile_image, username, name }
  } = state;
  return { my_memberships, my_cabinets, profile_image, username, name };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMyMemberships: () => {
      dispatch(membershipActions.fetchMyMemberships());
    },
    fetchMyCabinets: () => {
      dispatch(cabinetActions.fetchMyCabinets());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
