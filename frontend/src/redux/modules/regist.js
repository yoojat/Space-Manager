//imports

import { actionCreators as userActions } from "redux/modules/user";

//actions
// const SEL_BRANCH = 'SEL_BRANCH';
const SET_START_DATETIME = "SET_START_DATETIME";
const SET_SEL_BRANCH_ID = "SET_SEL_BRANCH_ID";
const SET_SEL_BRANCH = "SET_SEL_BRANCH";
const SET_SEL_END_DATETIME = "SET_SEL_END_DATETIME";
const SET_SEL_COSTTYPE = "SET_SEL_COSTTYPE";
const SET_SEL_CABINET_COSTTYPE = "SET_SEL_CABINET_COSTTYPE";
const SET_MEMBERSHIP_COST_TYPES = "SET_MEMBERSHIP_COST_TYPES";
const SET_ALL_INFO_SETUP = "SET_ALL_INFO_SETUP";
const SET_ALL_INFO_NOT_SETUP = "SET_ALL_INFO_NOT_SETUP";
const SET_SEL_CABINET_SET = "SET_SEL_CABINET_SET";
const SET_SEL_CABINET = "SET_SEL_CABINET";
const UNSET_SEL_CABINET = "UNSET_SEL_CABINET";
const CLEAR_SEL_CABINETS = "CLEAR_SEL_CABINETS";
const SET_USE_CABINET = "SET_USE_CABINET";
const SET_USE_NO_CABINET = "SET_USE_NO_CABINET";
const SET_SAME_PERIOD_ADJUSTMENT = "SET_SAME_PERIOD_ADJUSTMENT";
const SET_NOT_SAME_PERIOD_ADJUSTMENT = "SET_NOT_SAME_PERIOD_ADJUSTMENT";
const SET_EXTEND_MEMBERSHIP = "SET_EXTEND_MEMBERSHIP";
const SET_NOT_EXTEND_MEMBERSHIP = "SET_NOT_EXTEND_MEMBERSHIP";
const SET_EXTEND_MEMBERSHIP_COMPLETE = "SET_EXTEND_MEMBERSHIP_COMPLETE";
const SET_CLEAR_EXTEND_MEMBERSHIP = 'SET_CLEAR_EXTEND_MEMBERSHIP';
// const SET_DEFAULT = 'SET_DEFAULT';

//action creators : 리덕스 state를 변경

function setClearExtendMembership(){
  return {
    type:SET_CLEAR_EXTEND_MEMBERSHIP
  }
}

function setExtendMembershipComplete() {
  return {
    type: SET_EXTEND_MEMBERSHIP_COMPLETE
  };
}

function setNotExtendMembership() {
  return {
    type: SET_NOT_EXTEND_MEMBERSHIP
  };
}

function setExtendMembership() {
  return {
    type: SET_EXTEND_MEMBERSHIP
  };
}

function setNotSamePeriodAdjustment() {
  return {
    type: SET_NOT_SAME_PERIOD_ADJUSTMENT
  };
}

function setSamePeriodAdjustment() {
  return {
    type: SET_SAME_PERIOD_ADJUSTMENT
  };
}

function setUseNoCabinet() {
  return {
    type: SET_USE_NO_CABINET
  };
}

function setUseCabinet() {
  return {
    type: SET_USE_CABINET
  };
}

function setStartDatetime(start_datetime) {
  return {
    type: SET_START_DATETIME,
    start_datetime
  };
}

function clearSelCabinets() {
  return {
    type: CLEAR_SEL_CABINETS
  };
}

function unsetSelCabinet(sel_cabinet) {
  return {
    type: UNSET_SEL_CABINET,
    sel_cabinet
  };
}

function setSelCabinet(sel_cabinet) {
  return {
    type: SET_SEL_CABINET,
    sel_cabinet
  };
}

function setSelCabinetSet(sel_cabinet_set) {
  return {
    type: SET_SEL_CABINET_SET,
    sel_cabinet_set
  };
}

function setAllInfoNotSetup() {
  return {
    type: SET_ALL_INFO_NOT_SETUP
  };
}

function setAllInfoSetup() {
  return {
    type: SET_ALL_INFO_SETUP
  };
}

function setSelBranch(branch) {
  return {
    type: SET_SEL_BRANCH,
    branch
  };
}

function setSelBranchId(branchId) {
  return {
    type: SET_SEL_BRANCH_ID,
    branchId
  };
}

function setSelEndDateTime(end_datetime) {
  return {
    type: SET_SEL_END_DATETIME,
    end_datetime
  };
}

function setSelCabinetCostType(cabinet_cost_type) {
  return {
    type: SET_SEL_CABINET_COSTTYPE,
    cabinet_cost_type
  };
}

function setSelCostType(sel_cost_type) {
  return {
    type: SET_SEL_COSTTYPE,
    sel_cost_type
  };
}

function setMembershipCostTypes(cost_types) {
  return {
    type: SET_MEMBERSHIP_COST_TYPES,
    cost_types
  };
}

// API actions: api를 부를 때 사용

function fetchCabinetSet(cabinet_set_id) {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/cabinets/cabinetset/${cabinet_set_id}/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setSelCabinetSet(json));
        });
    }
  };
}
function getBranch(branchId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/branch/${branchId}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 404) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
      });
  };
}

function fetchSelBranch(branchId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/cabinets/branch/${branchId}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 404) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setSelBranch(json));
      });
  };
}

function fetchMembershipCostTypes() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/payment/costtype/membership/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 404) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setMembershipCostTypes(json));
      });
  };
}
// iniital state
const initialState = {
  start_datetime: null,
  sel_branch: null, //branchinfo
  sel_cabinets: [], //cabinets
  sel_membership: false, // boolean
  sel_cost_type: null, //days
  end_datetime: null,
  membership_cost_types: null,
  all_info_setup: false,
  sel_cabinet_set: null,
  cabinet_cost_type: null,
  use_cabinet: false,
  sel_memberships_for_extend: [],
  is_extend_membership: false,
  is_set_extend_membership: false
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXTEND_MEMBERSHIP_COMPLETE:
      return applySetExtendMembershipComplete(state, action);

    case SET_START_DATETIME:
      return applySetStartDatetime(state, action);

    case SET_SEL_BRANCH_ID:
      return applySetSelBranchId(state, action);

    case SET_SEL_BRANCH:
      return applySetSelBranch(state, action);

    case SET_SEL_END_DATETIME:
      return applySetSelEndDatetime(state, action);

    case SET_SEL_COSTTYPE:
      return applySetSelCostType(state, action);

    case SET_SEL_CABINET_COSTTYPE:
      return applySetSelCabinetCostType(state, action);

    case SET_MEMBERSHIP_COST_TYPES:
      return applySetMembershipCostTypes(state, action);

    case SET_ALL_INFO_SETUP:
      return applySetAllInfoSetup(state, action);

    case SET_ALL_INFO_NOT_SETUP:
      return applySetAllInfoNotSetup(state, action);

    case SET_SEL_CABINET_SET:
      return applySetSelCabinetSet(state, action);

    case SET_SEL_CABINET:
      return applySetSelCabinet(state, action);

    case UNSET_SEL_CABINET:
      return applyUnsetSelCabinet(state, action);

    case CLEAR_SEL_CABINETS:
      return applyClearSelCabinets(state, action);

    case SET_USE_CABINET:
      return applySetUseCabinet(state, action);

    case SET_USE_NO_CABINET:
      return applySetUseNoCabinet(state, action);

    case SET_SAME_PERIOD_ADJUSTMENT:
      return applySetSamePeriodAdjustment(state, action);

    case SET_NOT_SAME_PERIOD_ADJUSTMENT:
      return applySetNotSamePeriodAdjustment(state, action);

    case SET_EXTEND_MEMBERSHIP:
      return applySetExtendMembership(state, action);

    case SET_NOT_EXTEND_MEMBERSHIP:
      return applySetNotExtendMembership(state, action);
    
    case SET_CLEAR_EXTEND_MEMBERSHIP:
      return applySetClearExtendMembership(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetClearExtendMembership(state, action){
  return {
    ...state,
    is_set_extend_membership:false,
    set_extend_membership:false
  }
}

function applySetExtendMembershipComplete(state, action) {
  return {
    ...state,
    is_set_extend_membership: true
  };
}

function applySetNotExtendMembership(state, action) {
  return {
    ...state,
    is_extend_membership: false
  };
}

function applySetExtendMembership(state, action) {
  return {
    ...state,
    is_extend_membership: true
  };
}

function applySetNotSamePeriodAdjustment(state, action) {
  return {
    ...state,
    is_same_period: false
  };
}

function applySetSamePeriodAdjustment(state, action) {
  return {
    ...state,
    is_same_period: true
  };
}

function applySetUseNoCabinet(state, action) {
  return {
    ...state,
    use_cabinet: false
  };
}

function applySetUseCabinet(state, action) {
  return {
    ...state,
    use_cabinet: true
  };
}

function applySetStartDatetime(state, action) {
  const { start_datetime } = action;
  return {
    ...state,
    start_datetime
  };
}

function applyClearSelCabinets(state, action) {
  return {
    ...state,
    sel_cabinets: [],
    sel_cabinet_set: null
  };
}

function applyUnsetSelCabinet(state, action) {
  const { sel_cabinet } = action;
  const new_sel_cabinets = [...state.sel_cabinets];
  const index = new_sel_cabinets.indexOf(sel_cabinet);
  new_sel_cabinets.splice(index, 1);
  return {
    ...state,
    sel_cabinets: new_sel_cabinets
  };
}

function applySetSelCabinet(state, action) {
  const { sel_cabinet } = action;
  return {
    ...state,
    // sel_cabinet_id: new_sel_cabinet_ids,
    sel_cabinets: [...state.sel_cabinets, sel_cabinet]
  };
}

function applySetSelCabinetSet(state, action) {
  const { sel_cabinet_set } = action;
  return {
    ...state,
    sel_cabinet_set
  };
}

function applySetAllInfoNotSetup(state, action) {
  return {
    ...state,
    all_info_setup: false
  };
}

function applySetAllInfoSetup(state, action) {
  return {
    ...state,
    all_info_setup: true
  };
}

function applySetSelBranchId(state, action) {
  const { branchId } = action;
  return {
    ...state,
    sel_branch: branchId
  };
}

function applySetSelBranch(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch: branch,
    sel_cabinets: [],
    sel_cabinet_set: null
  };
}

function applySetSelEndDatetime(state, action) {
  const { end_datetime } = action;
  return {
    ...state,
    end_datetime
  };
}

function applySetSelCabinetCostType(state, action) {
  const { cabinet_cost_type } = action;
  return {
    ...state,
    cabinet_cost_type
  };
}

function applySetSelCostType(state, action) {
  const { sel_cost_type } = action;
  return {
    ...state,
    sel_cost_type
  };
}

function applySetMembershipCostTypes(state, action) {
  const { cost_types } = action;
  return {
    ...state,
    membership_cost_types: cost_types
  };
}

//exports

const actionCreators = {
  setStartDatetime,
  getBranch,
  setSelBranchId,
  setSelEndDateTime,
  setSelCostType,
  fetchMembershipCostTypes,
  fetchSelBranch,
  setAllInfoSetup,
  setAllInfoNotSetup,
  fetchCabinetSet,
  setSelCabinet,
  unsetSelCabinet,
  clearSelCabinets,
  setSelCabinetCostType,
  setUseCabinet,
  setUseNoCabinet,
  setSamePeriodAdjustment,
  setNotSamePeriodAdjustment,
  setExtendMembership,
  setNotExtendMembership,
  setExtendMembershipComplete,
  setClearExtendMembership
};

export { actionCreators };
//reducer export

export default reducer;
