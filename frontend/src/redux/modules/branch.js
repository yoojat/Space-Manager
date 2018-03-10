//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions

const SET_BRANCHES = 'SET_BRANCH'; // 가져온 지점들을 스테이트에 저장하는 액션

//action creators : 리덕스 state를 변경

function setBranches(branches) {
  return {
    type: SET_BRANCHES,
    branches,
  };
}
// API actions: api를 부를 때 사용

function getBranches() {
  return (dispatch, getState) => {
    const {user: {token}} = getState();

    fetch('/branch/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setBranches(json));
      });
  };
}

// iniital state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCHES:
      return applySetBranch(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetBranch(state, action) {
  const {branches} = action;
  return {
    ...state,
    branches,
  };
}
//exports

const actionCreators = {
  getBranches,
};

export {actionCreators};
//reducer export

export default reducer;
