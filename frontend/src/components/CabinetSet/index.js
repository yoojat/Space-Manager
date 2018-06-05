import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as registActions } from "redux/modules/regist";

const mapStateToProps = (state, ownProps) => {
  const {
    regist: { sel_cabinet_set }
  } = state;
  return {
    sel_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCabinetSet: cabinet_set_id => {
      dispatch(registActions.fetchCabinetSet(cabinet_set_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
