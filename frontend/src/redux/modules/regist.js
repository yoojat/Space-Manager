//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions
// const SEL_BRANCH = 'SEL_BRANCH';
const SET_SEL_BRANCH_ID = 'SET_SEL_BRANCH_ID';
const SET_SEL_WHEN_START = 'SET_SEL_WHEN_START';
const SET_SEL_DAYS = 'SET_SEL_DAYS';
const SET_MEMBERSHIP_COST_TYPES = 'SET_MEMBERSHIP_COST_TYPES';
//action creators : 리덕스 state를 변경

function setSelBranchId(branchId) {
  return {
    type: SET_SEL_BRANCH_ID,
    branchId,
  };
}

function setSelWhenStart(start_date) {
  return {
    type: SET_SEL_WHEN_START,
    start_date,
  };
}

function setSelDays(days) {
  return {
    type: SET_SEL_DAYS,
    days,
  };
}

function setMembershipCostTypes(cost_types) {
  return {
    type: SET_MEMBERSHIP_COST_TYPES,
    cost_types,
  };
}

// API actions: api를 부를 때 사용
function getBranch(branchId) {
  return (dispatch, getState) => {
    const {user: {token}} = getState();

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

function getMembershipCostTypes() {
  return (dispatch, getState) => {
    const {user: {token}} = getState();

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
  sel_branch: null, //id
  sel_cabinet: null, //id
  sel_membership: null, // boolean
  days: null, //days
  start_date: null, //string, datetime
  membership_cost_types: null,
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEL_BRANCH_ID:
      return applySetSelBranchId(state, action);
    case SET_SEL_WHEN_START:
      return applySetSelWhenStart(state, action);
    case SET_SEL_DAYS:
      return applySetSelDays(state, action);
    case SET_MEMBERSHIP_COST_TYPES:
      return applySetMembershipCostTypes(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetSelBranchId(state, action) {
  const {branchId} = action;
  return {
    ...state,
    sel_branch: branchId,
  };
}

function applySetSelWhenStart(state, action) {
  const {start_date} = action;
  return {
    ...state,
    start_date,
  };
}

function applySetSelDays(state, action) {
  const {days} = action;
  return {
    ...state,
    days,
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
  setSelWhenStart,
  setSelDays,
  getMembershipCostTypes,
};

export {actionCreators};
//reducer export

export default reducer;
