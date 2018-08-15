import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetShift } from "redux/modules/staffCabinetShift";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinetShift: { sel_branch, sel_cabinet_set }
  } = state;

  return {
    sel_branch,
    sel_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinetShift.fetchSelCabinetSet(sel_cabinet_set_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
