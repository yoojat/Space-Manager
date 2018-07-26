import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as cabinetActions } from "redux/modules/cabinet";
// import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_member_cabinets, is_fetched }
  } = state;

  return { my_cabinets: now_view_member_cabinets, is_fetched };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // getBranch: branchId => {
    //   dispatch(registActions.getBranch(branchId));
    // },

    fetchMyCabinets: () => {
      dispatch(cabinetActions.fetchMyCabinets());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
