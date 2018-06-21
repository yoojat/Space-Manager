import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as enrollMembershipActions } from "redux/modules/enrollMembership";
import { actionCreators as enrollCabinetActions } from 'redux/modules/enrollCabinet';

const mapStateToProps = (state, ownProps) => {
  const {
    enrollMembership: { use_cabinet, sel_branch, all_info_setup, sel_cost_type },
    enrollCabinet : {is_enroll_cabinet}
  } = state;
  return {
    use_cabinet,
    sel_branch,
    all_info_setup,
    sel_cost_type,
    is_enroll_cabinet
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setUseCabinet: () => {
    //   dispatch(enrollMembership.setUseCabinet());
    // },
    // setUseNoCabinet: () => {
    //   dispatch(enrollMembership.setUseNoCabinet());
    // },
    // clearSelCabinets: () => {
    //   dispatch(enrollMembership.clearSelCabinets());
    // },
    setAllInfoSetup: () => {
      dispatch(enrollMembershipActions.setAllInfoSetup());
    },
    setAllInfoNotSetup: () => {
      dispatch(enrollMembershipActions.setAllInfoNotSetup());
    },
    setIsEnrollCabinet: () =>{
      dispatch(enrollCabinetActions.setIsEnrollCabinet());
    },
    setIsEnrollCabinetNo: () =>{
      dispatch(enrollCabinetActions.setIsEnrollCabinetNo());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
