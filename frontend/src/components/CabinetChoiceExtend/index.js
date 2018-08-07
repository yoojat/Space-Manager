import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extendCabinet: { is_extend_cabinet },
    cabinet: { my_cabinets }
  } = state;

  return {
    is_extend_cabinet,
    my_cabinets: my_cabinets
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
