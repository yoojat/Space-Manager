import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinet } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: { sel_branch, sel_cabinet_set }
  } = state;

  return {
    sel_branch,
    sel_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSelCabinetSet: sel_cabinet_set_id => {
      dispatch(staffCabinet.fetchSelCabinetSet(sel_cabinet_set_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
