import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetShiftActions } from "redux/modules/staffCabinetShift";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

// const mapStateToProps = (state, ownProps) => {
//   const {} = state;

//   return {};
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    shiftCabinet: () => {
      dispatch(staffCabinetShiftActions.shiftCabinet());
    },
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
