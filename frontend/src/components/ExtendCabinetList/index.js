import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: { cabinets_to_extended }
  } = state;

  return { cabinets_to_extended };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetsToExtend: my_cabinet => {
      dispatch(extendActions.setCabinetsToExtend(my_cabinet));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
