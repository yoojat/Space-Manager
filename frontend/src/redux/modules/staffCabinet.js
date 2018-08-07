//imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_BRANCH_FOR_STAFF_CABINET = "SET_BRANCH_FOR_STAFF_CABINET";
const SET_SEL_CABINET_SET_STAFF_CABINET = "SET_SEL_CABINET_SET_STAFF_CABINET";
const SET_TEMP_CABINET_SET_STAFF_CABINET = "SET_TEMP_CABINET_SET_STAFF_CABINET";
const RESET_TEMP_CABINET_SET_STAFF_CABINET =
  "RESET_TEMP_CABINET_SET_STAFF_CABINET";

const CLEAR_CABINET_SET_STAFF_CABINET = "CLEAR_CABINET_SET_STAFF_CABINET";
const SET_SEL_CABINET_STAFF_CABINET = "SET_SEL_CABINET_STAFF_CABINET";
const SET_SCROLL_FIRST_FALSE_STAFF_CABINET =
  "SET_SCROLL_FIRST_FALSE_STAFF_CABINET";
const SET_CABINET_DETAIL_STAFF_CABINET = "SET_CABINET_DETAIL_STAFF_CABINET";
const SET_CABINET_DETAIL_NULL_STAFF_CABINET =
  "SET_CABINET_DETAIL_NULL_STAFF_CABINET";

const SET_SEARCHED_MEMBERS_STAFF_CABINET = "SET_SEARCHED_MEMBERS_STAFF_CABINET";

//action creators : 리덕스 state를 변경

function setSearchedMembersStaffCabinet(user) {
  return {
    type: SET_SEARCHED_MEMBERS_STAFF_CABINET,
    user
  };
}

function setCabinetDetailNullStaffCabinet() {
  return {
    type: SET_CABINET_DETAIL_NULL_STAFF_CABINET
  };
}

function setCabinetDetailStaffCabinet(cabinet_detail) {
  return {
    type: SET_CABINET_DETAIL_STAFF_CABINET,
    cabinet_detail
  };
}

function setSelCabinetStaffCabinet(cabinet) {
  return {
    type: SET_SEL_CABINET_STAFF_CABINET,
    cabinet
  };
}

function clearCabinetSet() {
  return {
    type: CLEAR_CABINET_SET_STAFF_CABINET
  };
}

function resetTempCabinetSetStaffCabinet() {
  return {
    type: RESET_TEMP_CABINET_SET_STAFF_CABINET
  };
}

function setTempCabinetSetStaffCabinet(temp_cabinet_set) {
  return {
    type: SET_TEMP_CABINET_SET_STAFF_CABINET,
    temp_cabinet_set
  };
}

function setBranchForStaffCabinet(branch) {
  return {
    type: SET_BRANCH_FOR_STAFF_CABINET,
    branch
  };
}

function setSelCabinetSet(cabinet_set) {
  return {
    type: SET_SEL_CABINET_SET_STAFF_CABINET,
    cabinet_set
  };
}

function setScrollFirstFalseStaffCabinet() {
  return {
    type: SET_SCROLL_FIRST_FALSE_STAFF_CABINET
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

function fetchSearchedMembers(keyword, scope) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/users/search/?keyword=${keyword}&scope=${scope}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setSearchedMembersStaffCabinet(json));
      });
  };
}

function getCabinetDetail(cabinet_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    dispatch(setCabinetDetailNullStaffCabinet());
    fetch(`/cabinets/detail/${cabinet_id}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setCabinetDetailStaffCabinet(json));
      });
  };
}

function getSelBranch(branchId) {
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
        dispatch(setBranchForStaffCabinet(json));
      });
  };
}

function fetchSelCabinetSet(cabinet_set_id) {
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

// iniital state
const initialState = {
  sel_branch: null,
  sel_cabinet_set: null,
  sel_cabinet: null,
  temp_cabinet_set: null,
  scroll_first: true,
  sel_cabinet_detail: null,
  searched_members: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCH_FOR_STAFF_CABINET:
      return applySetBranchForStaffCabinet(state, action);

    case SET_SEL_CABINET_SET_STAFF_CABINET:
      return applySetSelCabinetSetStaffCabinet(state, action);

    case RESET_TEMP_CABINET_SET_STAFF_CABINET:
      return applyResetTempCabinetSetStaffCabinet(state, action);

    case SET_TEMP_CABINET_SET_STAFF_CABINET:
      return applySetTempCabinetSetStaffCabinet(state, action);

    case CLEAR_CABINET_SET_STAFF_CABINET:
      return applyClearCabinetSet(state, action);

    case SET_SEL_CABINET_STAFF_CABINET:
      return applySetSelCabinetStaffCabinet(state, action);

    case SET_SCROLL_FIRST_FALSE_STAFF_CABINET:
      return applySetScrollFirstFalseStaffCabinet(state, action);

    case SET_CABINET_DETAIL_STAFF_CABINET:
      return applySetCabinetDetailStaffCabinet(state, action);

    case SET_CABINET_DETAIL_NULL_STAFF_CABINET:
      return applySetCabinetDetailNullStaffCabinet(state, action);

    case SET_SEARCHED_MEMBERS_STAFF_CABINET:
      return applySetSearchedMembersStaffCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetSearchedMembersStaffCabinet(state, action) {
  const { user } = action;
  return {
    ...state,
    searched_members: user
  };
}

function applySetCabinetDetailNullStaffCabinet(state, action) {
  return {
    ...state,
    sel_cabinet_detail: null
  };
}

function applySetCabinetDetailStaffCabinet(state, action) {
  const { cabinet_detail } = action;
  return {
    ...state,
    sel_cabinet_detail: cabinet_detail
  };
}

function applySetScrollFirstFalseStaffCabinet(state, action) {
  return {
    ...state,
    scroll_first: false
  };
}

function applySetSelCabinetStaffCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet: cabinet
  };
}

function applyClearCabinetSet(state, action) {
  return {
    ...state,
    sel_cabinet_set: null
  };
}

function applyResetTempCabinetSetStaffCabinet(state, action) {
  return {
    ...state,
    temp_cabinet_set: null
  };
}

function applySetTempCabinetSetStaffCabinet(state, action) {
  const { temp_cabinet_set } = action;
  return {
    ...state,
    temp_cabinet_set
  };
}

function applySetBranchForStaffCabinet(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch: branch
  };
}

function applySetSelCabinetSetStaffCabinet(state, action) {
  const { cabinet_set } = action;
  return {
    ...state,
    sel_cabinet_set: cabinet_set
  };
}

//exports

const actionCreators = {
  getSelBranch,
  fetchSelCabinetSet,
  setTempCabinetSetStaffCabinet,
  resetTempCabinetSetStaffCabinet,
  clearCabinetSet,
  setSelCabinetStaffCabinet,
  setScrollFirstFalseStaffCabinet,
  getCabinetDetail,
  fetchSearchedMembers
};

export { actionCreators };
//reducer export

export default reducer;
