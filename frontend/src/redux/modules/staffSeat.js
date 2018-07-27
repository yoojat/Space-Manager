//imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_BRANCH_INFO_FOR_SEAT_ADMIN = "SET_BRANCH_INFO_FOR_SEAT_ADMIN";
//action creators : 리덕스 state를 변경

function setBranchInfo(branch) {
  return {
    type: SET_BRANCH_INFO_FOR_SEAT_ADMIN,
    branch
  };
}

// function applySetTodaytoday_memberships(user) {
//   const {
//     is_staff,
//     is_superuser,
//     id,
//     name,
//     username,
//     profile_image,
//     phone
//   } = user;
//   return {
//     type: SAVE_AUTHORITY,
//     is_staff,
//     is_superuser,
//     id,
//     name,
//     username,
//     profile_image,
//     phone
//   };
// }

// API actions: api를 부를 때 사용

// 오늘 가입한 사람, 오늘 등록한 사람 모두 불러옴

function getBranchInfo(branch_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/branch/lounge/${branch_id}/`, {
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
        dispatch(setBranchInfo(json));
      });
  };
}

// iniital state
const initialState = {
  sel_branch_for_seat_man: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCH_INFO_FOR_SEAT_ADMIN:
      return applySetBranchInfoForSeatAdmin(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetBranchInfoForSeatAdmin(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch_for_seat_man: branch
  };
}
//exports

const actionCreators = {
  getBranchInfo
};

export { actionCreators };
//reducer export

export default reducer;
