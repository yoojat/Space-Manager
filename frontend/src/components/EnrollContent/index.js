import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    regist: { sel_branch, start_datetime, end_datetime, sel_cabinets }
  } = state;
  return { user, sel_branch, start_datetime, end_datetime, sel_cabinets };
};

export default connect(mapStateToProps)(Container);
