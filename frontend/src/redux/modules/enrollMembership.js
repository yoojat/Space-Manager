//imports

import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_SEL_BRANCH = "SET_SEL_BRANCH";
const SET_ENROLL_MEMBERSHIP_START_DATETIME =
  "SET_ENROLL_MEMBERSHIP_START_DATETIME";
const SET_MEMBERSHIP_COST_TYPES = "SET_MEMBERSHIP_COST_TYPES";
const SET_SEL_COSTTYPE = "SET_SEL_COSTTYPE";
const SET_SEL_ENROLL_MEMBERSHIP_END_DATETIME =
  "SET_SEL_ENROLL_MEMBERSHIP_END_DATETIME";
const SET_ENROLL_MEMBERSHIP_INFO_SETUP = "SET_ENROLL_MEMBERSHIP_INFO_SETUP";
const SET_ENROLL_MEMBERSHIP_INFO_NOT_SETUP =
  "SET_ENROLL_MEMBERSHIP_INFO_NOT_SETUP";
const CLEAR_ENROLL_MEMBERSHIP = "CLEAR_ENROLL_MEMBERSHIP";
const SET_ENROLL_MEMBERSHIP_TARGET_USER = "SET_ENROLL_MEMBERSHIP_TARGET_USER";

// const SEL_BRANCH = 'SEL_BRANCH';
// const SET_DEFAULT = 'SET_DEFAULT';

//action creators : 리덕스 state를 변경

function setEnrollMembershipTargetUser(target_user) {
  return { type: SET_ENROLL_MEMBERSHIP_TARGET_USER, target_user };
}

function clearEnrollMembership() {
  return {
    type: CLEAR_ENROLL_MEMBERSHIP
  };
}

function setAllInfoSetup() {
  return {
    type: SET_ENROLL_MEMBERSHIP_INFO_SETUP
  };
}

function setAllInfoNotSetup() {
  return {
    type: SET_ENROLL_MEMBERSHIP_INFO_NOT_SETUP
  };
}

function setSelEnrollMembershipEndDateTime(end_datetime) {
  return { type: SET_SEL_ENROLL_MEMBERSHIP_END_DATETIME, end_datetime };
}

function setSelCostType(sel_cost_type) {
  return {
    type: SET_SEL_COSTTYPE,
    sel_cost_type
  };
}

function setSelBranch(branch) {
  return {
    type: SET_SEL_BRANCH,
    branch
  };
}

function setEnrollMembershipStartDatetime(start_datetime) {
  return { type: SET_ENROLL_MEMBERSHIP_START_DATETIME, start_datetime };
}

function setMembershipCostTypes(cost_types) {
  return {
    type: SET_MEMBERSHIP_COST_TYPES,
    cost_types
  };
}

// API actions: api를 부를 때 사용

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

// iniital state
const initialState = {
  start_datetime: null,
  sel_branch: null, //branchinfo
  sel_cost_type: null, //days
  end_datetime: null,
  membership_cost_types: null,
  all_info_setup: false,
  target_user: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEL_BRANCH:
      return applySetSelBranch(state, action);
    case SET_ENROLL_MEMBERSHIP_START_DATETIME:
      return applySetEnrollMembershipStartDatetime(state, action);
    case SET_MEMBERSHIP_COST_TYPES:
      return applySetMembershipCostTypes(state, action);
    case SET_SEL_COSTTYPE:
      return applySetSelCostType(state, action);
    case SET_SEL_ENROLL_MEMBERSHIP_END_DATETIME:
      return applySetSelEnrollMembershipEndDatetime(state, action);
    case SET_ENROLL_MEMBERSHIP_INFO_SETUP:
      return applySetAllInfoSetup(state, action);
    case SET_ENROLL_MEMBERSHIP_INFO_NOT_SETUP:
      return applySetAllInfoNotSetup(state, action);
    case CLEAR_ENROLL_MEMBERSHIP:
      return applyClearEnrollMembership(state, action);
    case SET_ENROLL_MEMBERSHIP_TARGET_USER:
      return applySetEnrollMembershipTargetUser(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetEnrollMembershipTargetUser(state, action) {
  const { target_user } = action;
  return {
    ...state,
    target_user
  };
}

function applySetSelCostType(state, action) {
  const { sel_cost_type } = action;
  return {
    ...state,
    sel_cost_type
  };
}

function applyClearEnrollMembership(state, action) {
  return { ...initialState };
}

function applySetSelBranch(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch: branch
  };
}

function applySetEnrollMembershipStartDatetime(state, action) {
  const { start_datetime } = action;
  return {
    ...state,
    start_datetime
  };
}

function applySetMembershipCostTypes(state, action) {
  const { cost_types } = action;
  return {
    ...state,
    membership_cost_types: cost_types
  };
}

function applySetSelEnrollMembershipEndDatetime(state, action) {
  const { end_datetime } = action;
  return {
    ...state,
    end_datetime
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

//exports

const actionCreators = {
  setAllInfoSetup,
  setAllInfoNotSetup,
  setSelEnrollMembershipEndDateTime,
  setSelCostType,
  setSelBranch,
  setEnrollMembershipStartDatetime,
  setMembershipCostTypes,
  fetchMembershipCostTypes,
  fetchSelBranch,
  clearEnrollMembership,
  setEnrollMembershipTargetUser
};

export { actionCreators };
//reducer export

export default reducer;
