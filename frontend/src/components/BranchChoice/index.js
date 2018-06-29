import { connect } from "react-redux";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as enrollCabinetActions } from "redux/modules/enrollCabinet";
import { actionCreators as extendCabinetActions } from "redux/modules/extendCabinet";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: { sel_branch },
    branch: { branches }
  } = state;
  return {
    sel_branch,
    branches
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelBranch: branch_id => {
      dispatch(enrollMembershipActions.fetchSelBranch(branch_id));
    },
    clearEnrollCabinet: () => {
      dispatch(enrollCabinetActions.clearEnrollCabinet());
    },
    clearExtendCabinet: () => {
      dispatch(extendCabinetActions.clearExtendCabinet());
    },
    setShowEnrollCabinetIsFirstTrue: () => {
      dispatch(enrollCabinetActions.setShowEnrollCabinetIsFirstTrue());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
