import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { is_extend_membership }
  } = state;
  return {
    is_extend_membership
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setExtendMembership: () => {
      dispatch(registActions.setExtendMembership());
    },
    setNotExtendMembership: () => {
      dispatch(registActions.setNotExtendMembership());
    },
    setExtendMembershipComplete: () => {
      dispatch(registActions.setExtendMembershipComplete());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
