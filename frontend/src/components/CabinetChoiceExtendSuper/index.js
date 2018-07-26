import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { is_extend_cabinet },
    staff: { now_view_member_cabinets }
  } = state;

  return {
    is_extend_cabinet,
    my_cabinets: now_view_member_cabinets
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
