import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: { sel_cabinet_cost_type }
  } = state;

  return { sel_cabinet_cost_type };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCabinetCostType: cabinet_cost_type => {
      dispatch(extendActions.setCabinetCostType(cabinet_cost_type));
    },
    setAllInfoSetup: () => {
      dispatch(extendActions.setAllInfoSetup());
    },
    setAllInfoNotSetup: () => {
      dispatch(extendActions.setAllInfoNotSetup());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
