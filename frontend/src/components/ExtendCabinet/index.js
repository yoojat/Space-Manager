import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as extendActions } from "redux/modules/extend";

const mapStateToProps = (state, ownProps) => {
  const {
    extend: { will_extend_cabinet, cabinets_to_extended }
  } = state;
  return {
    will_extend_cabinet,
    cabinets_to_extended
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWillExtendCabinet: () => {
      dispatch(extendActions.setWillExtendCabinet());
    },
    setWillDontExtendCabinet: () => {
      dispatch(extendActions.setWillDontExtendCabinet());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
