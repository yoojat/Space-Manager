import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { memberships }
  } = state;
  return {
    memberships
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembership: () => {
      dispatch(userActions.setMembership());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
