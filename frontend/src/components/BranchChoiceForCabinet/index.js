import { connect } from "react-redux";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollCabinet: { sel_branch },
    branch: { branches }
  } = state;
  return {
    branches,
    sel_branch
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearEnrollCabinet: () => {
      dispatch(enrollCabinetActions.clearEnrollCabinet());
    },
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    },
    setShowEnrollCabinetIsFirstTrue: () => {
      dispatch(enrollCabinetActions.setShowEnrollCabinetIsFirstTrue());
    },
    fetchSelBranch: sel_branch_id => {
      dispatch(enrollCabinetActions.fetchSelBranch(sel_branch_id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
