import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { extend_cabinet_cost_types }
  } = state;

  return { extend_cabinet_cost_types };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchExtendCabinetCostTypes: () => {
      dispatch(extendCabinetActions.fetchExtendCabinetCostTypes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
