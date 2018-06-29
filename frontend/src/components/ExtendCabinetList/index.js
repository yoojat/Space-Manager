import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { is_extend_cabinet, cabinets_extend }
  } = state;

  return { is_extend_cabinet, cabinets_extend };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetExtend: my_cabinet => {
      dispatch(extendCabinetActions.setCabinetExtend(my_cabinet));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
