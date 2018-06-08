import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: { membership_to_extended }
  } = state;
  return {
    membership_to_extended,
    membership: ownProps.membership
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMembershipsToExtended: membership => {
      dispatch(extendActions.setMembershipsToExtended(membership));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
