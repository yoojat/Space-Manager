//imports

import { actionCreators as userActions } from "redux/modules/user";

//actions

const SET_BRANCHES = "SET_BRANCHES"; // 가져온 지점들을 스테이트에 저장하는 액션
const SET_BRANCH = "SET_BRANCH";
//action creators : 리덕스 state를 변경

function setBranches(branches) {
  return {
    type: SET_BRANCHES,
    branches
  };
}

function setBranch(branch) {
  return {
    type: SET_BRANCH,
    branch
  };
}
// API actions: api를 부를 때 사용

function fetchBranches() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch("/branch/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
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

function getBranch() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/branch/here/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log(1);
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setBranch(json));
      });
  };
}

// iniital state
const initialState = {
  branches: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCHES:
      return applySetBranches(state, action);
    case SET_BRANCH:
      return applySetBranch(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetBranches(state, action) {
  const { branches } = action;
  return {
    ...state,
    branches
  };
}

function applySetBranch(state, action) {
  const { branch } = action;
  return {
    ...state,
    now_branch: branch
  };
}
//exports

const actionCreators = {
  fetchBranches,
  getBranch
};

export { actionCreators };
//reducer export

export default reducer;
