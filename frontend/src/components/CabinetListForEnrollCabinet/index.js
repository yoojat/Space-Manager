import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";

// const mapStateToProps = (state, ownProps) => {
//   const {} = state;

//   return {};
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subtractCabinetToEnroll: cabinet => {
      dispatch(enrollCabinetActions.subtractCabinetToEnroll(cabinet));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
