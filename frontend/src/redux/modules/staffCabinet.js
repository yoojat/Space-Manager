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
const SET_SEARCHED_MEMBERS_NULL_STAFF_CABINET =
  "SET_SEARCHED_MEMBERS_NULL_STAFF_CABINET";
const SET_SEL_USER_STAFF_CABINET = "SET_SEL_USER_STAFF_CABINET";
const SET_SEL_USER_NULL_STAFF_CABINET = "SET_SEL_USER_NULL_STAFF_CABINET";
const SET_START_DATETIME_STAFF_CABINET = "SET_START_DATETIME_STAFF_CABINET";
const SET_END_DATETIME_STAFF_CABINET = "SET_END_DATETIME_STAFF_CABINET";
const SET_INIT_AFTER_REGIST = "SET_INIT_AFTER_REGIST";
const SET_WINDOW_SHOW_TRUE = "SET_WINDOW_SHOW_TRUE";
const SET_WINDOW_SHOW_FALSE = "SET_WINDOW_SHOW_FALSE";
const SET_CABINET_SHOW_TRUE_STAFF_CABINET =
  "SET_CABINET_SHOW_TRUE_STAFF_CABINET";

//action creators : 리덕스 state를 변경

function setCabinetShowTrueStaffCabinet() {
  return {
    type: SET_CABINET_SHOW_TRUE_STAFF_CABINET
  };
}

function setWindowShowTrue() {
  return {
    type: SET_WINDOW_SHOW_TRUE
  };
}

function setWindowShowFalse() {
  return {
    type: SET_WINDOW_SHOW_FALSE
  };
}

function setInitAfterRegist() {
  return {
    type: SET_INIT_AFTER_REGIST
  };
}

function setStartDatetimeStaffCabinet(start_datetime) {
  return {
    type: SET_START_DATETIME_STAFF_CABINET,
    start_datetime
  };
}

function setEndDatetimeStaffCabinet(end_datetime) {
  return {
    type: SET_END_DATETIME_STAFF_CABINET,
    end_datetime
  };
}

function setSelUserNullStaffCabinet() {
  return {
    type: SET_SEL_USER_NULL_STAFF_CABINET
  };
}

function setSelUserStaffCabinet(user) {
  return {
    type: SET_SEL_USER_STAFF_CABINET,
    user
  };
}

function setSearchMembersNullStaffCabinet() {
  return {
    type: SET_SEARCHED_MEMBERS_NULL_STAFF_CABINET
  };
}

function setSearchedMembersStaffCabinet(users) {
  return {
    type: SET_SEARCHED_MEMBERS_STAFF_CABINET,
    users
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

// API actions: api를 부를 때 사용

function fetchSelCabinet(cabinet_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

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
        dispatch(setSelCabinetStaffCabinet(json));
      });
  };
}
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
        console.log(json);
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
    dispatch(clearCabinetSet());
    dispatch(setCabinetShowTrueStaffCabinet());

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

function getUserForAllocate(user_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    dispatch(setSelUserNullStaffCabinet());

    fetch(`/users/id/${user_id}`, {
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
        dispatch(setSelUserStaffCabinet(json));
      });
  };
}

function registCabinetLog(cabinet_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/cabinets/regist/log/${cabinet_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function enrollCabinet(cabinets, start_date, end_date, user) {
  return async function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    await fetch(`/cabinets/enrollCabinets/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        is_clean: false,
        cabinets,
        start_date,
        end_date,
        user
      })
    })
      .then(response => {
        if (response.status !== 202) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(registCabinetLog(json.id));
      });
  };
}

// iniital state
const initialState = {
  sel_branch: null,
  sel_cabinet_set: null,
  sel_cabinet: null,
  sel_user: null,
  temp_cabinet_set: null,
  scroll_first: true,
  sel_cabinet_detail: null,
  searched_members: null,
  sel_start_datetime: null,
  sel_end_datetime: null,
  window_show: false,
  show_cabinets: false
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

    case SET_SEARCHED_MEMBERS_NULL_STAFF_CABINET:
      return applySetSearchedMembersNullStaffCabinet(state, action);

    case SET_SEL_USER_STAFF_CABINET:
      return applySetSelUserStaffCabinet(state, action);

    case SET_SEL_USER_NULL_STAFF_CABINET:
      return applySetSelUserNullStaffCabinet(state, action);

    case SET_START_DATETIME_STAFF_CABINET:
      return applySetStartDatetimeStaffCabinet(state, action);

    case SET_END_DATETIME_STAFF_CABINET:
      return applySetEndDatetimeStaffCabinet(state, action);

    case SET_INIT_AFTER_REGIST:
      return applySetInitAfterRegist(state, action);

    case SET_WINDOW_SHOW_TRUE:
      return applysetWindowShowTrue(state, action);

    case SET_WINDOW_SHOW_FALSE:
      return applysetWindowShowFalse(state, action);

    case SET_CABINET_SHOW_TRUE_STAFF_CABINET:
      return applySetCabinetShowTrueStaffCabinet(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetCabinetShowTrueStaffCabinet(state, action) {
  return {
    ...state,
    show_cabinets: true
  };
}

function applysetWindowShowTrue(state, action) {
  return {
    ...state,
    window_show: true
  };
}
function applysetWindowShowFalse(state, action) {
  return {
    ...state,
    window_show: false
  };
}

function applySetInitAfterRegist(state, action) {
  return {
    ...state,
    searched_members: initialState.searched_members,
    sel_start_datetime: initialState.sel_start_datetime,
    sel_end_datetime: initialState.sel_end_datetime
  };
}

function applySetStartDatetimeStaffCabinet(state, action) {
  const { start_datetime } = action;
  return {
    ...state,
    sel_start_datetime: start_datetime
  };
}
function applySetEndDatetimeStaffCabinet(state, action) {
  const { end_datetime } = action;
  return {
    ...state,
    sel_end_datetime: end_datetime
  };
}

function applySetSelUserNullStaffCabinet(state, action) {
  return {
    ...state,
    sel_user: null
  };
}

function applySetSelUserStaffCabinet(state, action) {
  const { user } = action;
  return {
    ...state,
    sel_user: user
  };
}

function applySetSearchedMembersNullStaffCabinet(state, action) {
  return {
    ...state,
    searched_members: null
  };
}

function applySetSearchedMembersStaffCabinet(state, action) {
  const { users } = action;
  return {
    ...state,
    searched_members: users
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
  fetchSearchedMembers,
  setSearchMembersNullStaffCabinet,
  getUserForAllocate,
  setStartDatetimeStaffCabinet,
  setEndDatetimeStaffCabinet,
  enrollCabinet,
  setInitAfterRegist,
  setWindowShowTrue,
  setWindowShowFalse,
  fetchSelCabinet,
  setCabinetShowTrueStaffCabinet
};

export { actionCreators };
//reducer export

export default reducer;
