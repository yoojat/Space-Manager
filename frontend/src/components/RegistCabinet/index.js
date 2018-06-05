import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as cabinetActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNowUsingCabinets: userid => {
      dispatch(cabinetActions.getNowUsingCabinets(userid));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
