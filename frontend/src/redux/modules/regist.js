//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions
// const SEL_BRANCH = 'SEL_BRANCH';
const SET_SEL_BRANCH_ID = 'SET_SEL_BRANCH_ID';
const SET_SEL_WHEN_START = 'SET_SEL_WHEN_START';
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
// iniital state
const initialState = {
  sel_branch: null, //id
  sel_cabinet: null, //id
  sel_membership: null, // boolean
  period: null, //days
  start_date: null, //string, datetime
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEL_BRANCH_ID:
      return applySetSelBranchId(state, action);
    case SET_SEL_WHEN_START:
      return applySetSelWhenStart(state, action);
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
    start_date: start_date,
  };
}

//exports

const actionCreators = {
  getBranch,
  setSelBranchId,
  setSelWhenStart,
};

export {actionCreators};
//reducer export

export default reducer;
