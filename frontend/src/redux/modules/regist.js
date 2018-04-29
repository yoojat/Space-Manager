//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions
// const SEL_BRANCH = 'SEL_BRANCH';
const SET_SEL_BRANCH_ID = 'SET_SEL_BRANCH_ID';
const SET_SEL_BRANCH = 'SET_SEL_BRANCH';
const SET_SEL_DATE_START = 'SET_SEL_DATE_START';
const SET_SEL_TIME_START = 'SET_SEL_TIME_START';
const SET_SEL_END_DATETIME = 'SET_SEL_END_DATETIME';
const SET_SEL_COSTTYPE = 'SET_SEL_COSTTYPE';
const SET_MEMBERSHIP_COST_TYPES = 'SET_MEMBERSHIP_COST_TYPES';
const SET_ALL_INFO_SETUP = 'SET_ALL_INFO_SETUP';
const SET_ALL_INFO_NOT_SETUP = 'SET_ALL_INFO_NOT_SETUP';
const SET_SEL_CABINET_SET_ID = 'SET_SEL_CABINET_SET_ID';
const SET_SEL_CBAINET_SET = 'SET_SEL_CABINET_SET';
const SET_SEL_CABINET = 'SET_SEL_CABINET';
const UNSET_SEL_CABINET = 'UNSET_SEL_CABINET';
//action creators : 리덕스 state를 변경

function unsetSelCabinet(sel_cabinet) {
  return {
    type: UNSET_SEL_CABINET,
    sel_cabinet,
  };
}

function setSelCabinet(sel_cabinet) {
  return {
    type: SET_SEL_CABINET,
    sel_cabinet,
  };
}

function setSelCabinetSet(sel_cabinet_set) {
  return {
    type: SET_SEL_CBAINET_SET,
    sel_cabinet_set,
  };
}

function setSelCabinetSetId(sel_cabinet_set_id) {
  return {
    type: SET_SEL_CABINET_SET_ID,
    sel_cabinet_set_id,
  };
}

function setAllInfoNotSetup() {
  return {
    type: SET_ALL_INFO_NOT_SETUP,
  };
}

function setAllInfoSetup() {
  return {
    type: SET_ALL_INFO_SETUP,
  };
}

function setSelBranch(branch) {
  return {
    type: SET_SEL_BRANCH,
    branch,
  };
}

function setSelBranchId(branchId) {
  return {
    type: SET_SEL_BRANCH_ID,
    branchId,
  };
}

function setSelDateStart(start_date) {
  return {
    type: SET_SEL_DATE_START,
    start_date,
  };
}

function setSelTimeStart(start_time) {
  return {
    type: SET_SEL_TIME_START,
    start_time,
  };
}

function setSelEndDateTime(end_datetime) {
  return {
    type: SET_SEL_END_DATETIME,
    end_datetime,
  };
}

function setSelCostType(cost_type) {
  return {
    type: SET_SEL_COSTTYPE,
    cost_type,
  };
}

function setMembershipCostTypes(cost_types) {
  return {
    type: SET_MEMBERSHIP_COST_TYPES,
    cost_types,
  };
}

// API actions: api를 부를 때 사용

function getCabinetSet(cabinet_set_id) {
  return function(dispatch, getState) {
    const {
      user: {token, isLoggedIn},
    } = getState();
    if (isLoggedIn) {
      fetch(`/cabinets/cabinetset/${cabinet_set_id}/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
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
      user: {token},
    } = getState();

    fetch(`/branch/${branchId}/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
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

function getSelBranch(branchId) {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();

    fetch(`/cabinets/branch/${branchId}/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
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

function getMembershipCostTypes() {
  return (dispatch, getState) => {
    const {
      user: {token},
    } = getState();

    fetch(`/payment/costtype/membership/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
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
  sel_branch: null, //branchinfo
  sel_cabinets: [], //cabinets
  sel_membership: null, // boolean
  cost_type: null, //days
  start_date: null, //string, datetime
  start_time: null,
  end_datetime: null,
  membership_cost_types: null,
  all_info_setup: false,
  sel_cabinet_set_id: null,
  sel_cabinet_set: null,
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEL_BRANCH_ID:
      return applySetSelBranchId(state, action);

    case SET_SEL_BRANCH:
      return applySetSelBranch(state, action);

    case SET_SEL_DATE_START:
      return applySetSelDateStart(state, action);

    case SET_SEL_END_DATETIME:
      return applySetSelEndDatetime(state, action);

    case SET_SEL_TIME_START:
      return applySetSelTimeStart(state, action);

    case SET_SEL_COSTTYPE:
      return applySetSelCostType(state, action);

    case SET_MEMBERSHIP_COST_TYPES:
      return applySetMembershipCostTypes(state, action);

    case SET_ALL_INFO_SETUP:
      return applySetAllInfoSetup(state, action);

    case SET_ALL_INFO_NOT_SETUP:
      return applySetAllInfoNotSetup(state, action);

    case SET_SEL_CABINET_SET_ID:
      return applySetSelCabinetSetId(state, action);

    case SET_SEL_CBAINET_SET:
      return applySetSelCabinetSet(state, action);

    case SET_SEL_CABINET:
      return applySetSelCabinet(state, action);

    case UNSET_SEL_CABINET:
      return applyUnsetSelCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applyUnsetSelCabinet(state, action) {
  const {sel_cabinet} = action;
  const new_sel_cabinets = [...state.sel_cabinets];
  const index = new_sel_cabinets.indexOf(sel_cabinet);
  new_sel_cabinets.splice(index, 1);
  return {
    ...state,
    sel_cabinets: new_sel_cabinets,
  };
}

function applySetSelCabinet(state, action) {
  const {sel_cabinet} = action;
  return {
    ...state,
    // sel_cabinet_id: new_sel_cabinet_ids,
    sel_cabinets: [...state.sel_cabinets, sel_cabinet],
  };
}

function applySetSelCabinetSet(state, action) {
  const {sel_cabinet_set} = action;
  return {
    ...state,
    sel_cabinet_set,
  };
}

function applySetSelCabinetSetId(state, action) {
  const {sel_cabinet_set_id} = action;
  return {
    ...state,
    sel_cabinet_set_id,
  };
}

function applySetAllInfoNotSetup(state, action) {
  return {
    ...state,
    all_info_setup: false,
  };
}

function applySetAllInfoSetup(state, action) {
  return {
    ...state,
    all_info_setup: true,
  };
}

function applySetSelBranchId(state, action) {
  const {branchId} = action;
  return {
    ...state,
    sel_branch: branchId,
  };
}

function applySetSelBranch(state, action) {
  const {branch} = action;
  return {
    ...state,
    sel_branch: branch,
  };
}

function applySetSelDateStart(state, action) {
  const {start_date} = action;
  return {
    ...state,
    start_date,
  };
}

function applySetSelTimeStart(state, action) {
  const {start_time} = action;
  return {
    ...state,
    start_time,
  };
}

function applySetSelEndDatetime(state, action) {
  const {end_datetime} = action;
  return {
    ...state,
    end_datetime,
  };
}

function applySetSelCostType(state, action) {
  const {cost_type} = action;
  return {
    ...state,
    cost_type,
  };
}

function applySetMembershipCostTypes(state, action) {
  const {cost_types} = action;
  return {
    ...state,
    membership_cost_types: cost_types,
  };
}

//exports

const actionCreators = {
  getBranch,
  setSelBranchId,
  setSelDateStart,
  setSelTimeStart,
  setSelEndDateTime,
  setSelCostType,
  getMembershipCostTypes,
  getSelBranch,
  setAllInfoSetup,
  setAllInfoNotSetup,
  getCabinetSet,
  setSelCabinetSetId,
  setSelCabinet,
  unsetSelCabinet,
};

export {actionCreators};
//reducer export

export default reducer;
