import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { cabinet_cost_types }
  } = state;

  return { cabinet_cost_types };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetCabinetCostTypes: () => {
      dispatch(registActions.fetCabinetCostTypes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
