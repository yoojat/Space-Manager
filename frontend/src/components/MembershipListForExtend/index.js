import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendMembershipActions } from "redux/modules/extendMembership";

const mapStateToProps = (state, ownProps) => {
  const {
    extendMembership: { membership_extend }
  } = state;
  return {
    membership_extend
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembershipExtend: membership => {
      dispatch(extendMembershipActions.setMembershipExtend(membership));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
