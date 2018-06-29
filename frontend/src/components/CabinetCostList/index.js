import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { sel_cabinet_costtype }
  } = state;

  return { sel_cabinet_costtype };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setExtendCabinetCostType: cabinet_cost_type => {
      dispatch(
        extendCabinetActions.setExtendCabinetCostType(cabinet_cost_type)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
