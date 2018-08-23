//imports
import { actionCreators as userActions } from "redux/modules/user";

//actions

const SET_MINIMAP_BRANCH = "SET_MINIMAP_BRANCH";
//action creators : 리덕스 state를 변경

function setMinimapBranch(branch) {
  return {
    type: SET_MINIMAP_BRANCH,
    branch
  };
}
// API actions: api를 부를 때 사용

function getMinimapBranch() {
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
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setMinimapBranch(json));
      });
  };
}

// iniital state
const initialState = {
  branch: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MINIMAP_BRANCH:
      return applySetBranch(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetBranch(state, action) {
  const { branch } = action;
  return {
    ...state,
    now_branch: branch
  };
}
//exports

const actionCreators = {
  getMinimapBranch
};

export { actionCreators };
//reducer export

export default reducer;
