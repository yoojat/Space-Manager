import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

const mapStateToProps = (state, ownProps) => {
  const {
    staffCabinet: {
      searched_members,
      sel_start_datetime,
      sel_end_datetime,
      sel_cabinet,
      sel_user,
      sel_cabinet_set
    }
  } = state;

  return {
    searched_members,
    sel_start_datetime,
    sel_end_datetime,
    sel_cabinet,
    sel_user,
    sel_cabinet_set
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSearchedMembers: (keyword, scope) => {
      dispatch(staffCabinetActions.fetchSearchedMembers(keyword, scope));
    },
    setSearchMembersNullStaffCabinet: () => {
      dispatch(staffCabinetActions.setSearchMembersNullStaffCabinet());
    },
    getUserForAllocate: user_id => {
      dispatch(staffCabinetActions.getUserForAllocate(user_id));
    },
    setStartDatetimeStaffCabinet: sel_datetime => {
      dispatch(staffCabinetActions.setStartDatetimeStaffCabinet(sel_datetime));
    },
    setEndDatetimeStaffCabinet: sel_datetime => {
      dispatch(staffCabinetActions.setEndDatetimeStaffCabinet(sel_datetime));
    },
    enrollCabinet: async (cabinets, start_date, end_date, user) => {
      await dispatch(
        staffCabinetActions.enrollCabinet(cabinets, start_date, end_date, user)
      );
    },
    setInitAfterRegist: () => {
      dispatch(staffCabinetActions.setInitAfterRegist());
    },
    setWindowShowFalse: () => {
      dispatch(staffCabinetActions.setWindowShowFalse());
    },
    fetchSelCabinetSet: async cabinet_set_id => {
      await dispatch(staffCabinetActions.fetchSelCabinetSet(cabinet_set_id));
    },
    getCabinetDetail: cabinet_id => {
      dispatch(staffCabinetActions.getCabinetDetail(cabinet_id));
    },
    setSelCabinetStaffCabinet: cabinet => {
      dispatch(staffCabinetActions.setSelCabinetStaffCabinet(cabinet));
    },
    fetchSelCabinet: cabinet_id => {
      dispatch(staffCabinetActions.fetchSelCabinet(cabinet_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
