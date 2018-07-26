import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    staff: { now_view_user, detail_view_loading, seeing_regist_window }
  } = state;

  return { now_view_user, detail_view_loading, seeing_regist_window };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
