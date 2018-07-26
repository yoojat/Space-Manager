import Container from "./container";
import { connect } from "react-redux";

import { actionCreators as staffActions } from "redux/modules/staff";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeRegistWindow: () => {
      dispatch(staffActions.setSeeingRegistWindowFalse());
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Container);
