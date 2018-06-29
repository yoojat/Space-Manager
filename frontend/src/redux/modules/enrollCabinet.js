// imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const RESET_ENROLL_CABINET = "RESET_ENROLL_CABINET"; //선택한 정보들을 모두 초기화
const SELECT_CABINET_START_DATETIME = "SELECT_CABINET_START_DATETIME"; //시작 날짜 선택
const SELECT_CABINET_END_DATETIME = "SELECT_CABINET_END_DATETIME"; // 만료 날짜 선택
const SET_ENROLL_CABINET_TARGET_USER = "SET_ENROLL_CABINET_TARGET_USER"; // 타겟 유저 선택
const ADD_CABINET_TO_ENROLL = "ADD_CABINET_TO_ENROLL";
const SET_IS_ENROLL_CABINET = "SET_IS_ENROLL_CABINET";
const SET_IS_ENROLL_CABINET_NO = "SET_IS_ENROLL_CABINET_NO";
const SET_SHOW_ENROLL_CABINET_IS_FIRST_FALSE =
  "SET_SHOW_ENROLL_CABINET_IS_FIRST_FALSE";
const SET_SHOW_ENROLL_CABINET_IS_FIRST_TRUE =
  "SET_SHOW_ENROLL_CABINET_IS_FIRST_TRUE";
const SET_CABINET_COST_TYPE = "SET_CABINET_COST_TYPE";
const SET_SEL_CABINET_BRANCH = "SET_SEL_CABINET_BRANCH";
const SET_SEL_CABINET_SET = "SET_SEL_CABINET_SET";
const SET_ENROLL_CABINET_START_DATETIME = "SET_ENROLL_CABINET_START_DATETIME";
const SET_END_DATETIME = "SET_END_DATETIME";
const SET_CABINET_COST_TYPES = "SET_CABINET_COST_TYPES";
const SET_TEMP_CABINET_SET = "SET_TEMP_CABINET_SET";
const RESET_TEMP_CABINET_SET = "RESET_TEMP_CABINET_SET";
const SUBTRACT_CABINET_TO_ENROLL = "SUBTRACT_CABINET_TO_ENROLL";
const ENROLL_CABINET_ALL_INFO_SETUP = "ENROLL_CABINET_ALL_INFO_SETUP";
const ENROLL_CABINET_ALL_INFO_NO_SETUP = "ENROLL_CABINET_ALL_INFO_NO_SETUP";
const CLEAR_ENROLL_CABINET = "CLEAR_ENROLL_CABINET";
const CLEAR_CABINET_SET = "CLEAR_CABINET_SET";
const SET_SCROLL_FIRST_FALSE = "SET_SCROLL_FIRST_FALSE";
const CLEAR_SEL_CABINET_INFO = "CLEAR_SEL_CABINET_INFO";

//action creators : 리덕스 state를 변경

function clearSelCabinetInfo() {
  return {
    type: CLEAR_SEL_CABINET_INFO
  };
}

function setScrollFirstFalse() {
  return {
    type: SET_SCROLL_FIRST_FALSE
  };
}

function clearCabinetSet() {
  return {
    type: CLEAR_CABINET_SET
  };
}

function clearEnrollCabinet() {
  return {
    type: CLEAR_ENROLL_CABINET
  };
}

function enrollCabinetAllInfoNoSetup() {
  return {
    type: ENROLL_CABINET_ALL_INFO_NO_SETUP
  };
}

function enrollCabinetAllInfoSetup() {
  return {
    type: ENROLL_CABINET_ALL_INFO_SETUP
  };
}

function subtractCabinetToEnroll(cabinet) {
  return {
    type: SUBTRACT_CABINET_TO_ENROLL,
    cabinet
  };
}

function resetTempCabinetSet() {
  return {
    type: RESET_TEMP_CABINET_SET
  };
}

function setTempCabinetSet(temp_cabinet_set) {
  return {
    type: SET_TEMP_CABINET_SET,
    temp_cabinet_set
  };
}

function setCabinetCostTypes(cabinet_cost_types) {
  return {
    type: SET_CABINET_COST_TYPES,
    cabinet_cost_types
  };
}

function setEndDatetime(sel_end_datetime) {
  return {
    type: SET_END_DATETIME,
    sel_end_datetime
  };
}

function setEnrollCabinetStartDatetime(sel_start_datetime) {
  return { type: SET_ENROLL_CABINET_START_DATETIME, sel_start_datetime };
}

function setSelCabinetSet(sel_cabinet_set) {
  return {
    type: SET_SEL_CABINET_SET,
    sel_cabinet_set
  };
}

function setSelCabinetBranch(sel_branch) {
  return {
    type: SET_SEL_CABINET_BRANCH,
    sel_branch
  };
}

function setCabinetCostType(sel_cabinet_cost_type) {
  return {
    type: SET_CABINET_COST_TYPE,
    sel_cabinet_cost_type
  };
}

function setShowEnrollCabinetIsFirstTrue() {
  return {
    type: SET_SHOW_ENROLL_CABINET_IS_FIRST_TRUE
  };
}

function SetShowEnrollCabinetIsFirstFalse() {
  return {
    type: SET_SHOW_ENROLL_CABINET_IS_FIRST_FALSE
  };
}

function setIsEnrollCabinet() {
  return {
    type: SET_IS_ENROLL_CABINET
  };
}

function setIsEnrollCabinetNo() {
  return {
    type: SET_IS_ENROLL_CABINET_NO
  };
}

function addCabinetToEnroll(cabinet) {
  return {
    type: ADD_CABINET_TO_ENROLL,
    cabinet
  };
}

function setEnrollCabinetTargetUser(target_user) {
  return {
    type: SET_ENROLL_CABINET_TARGET_USER,
    target_user
  };
}

function resetEnrollCabinet() {
  return {
    type: RESET_ENROLL_CABINET
  };
}

function selectCabinetStartDatetime(start_datetime) {
  return {
    type: SELECT_CABINET_START_DATETIME,
    start_datetime
  };
}

function selectCabinetEndDatetime(end_datetime) {
  return {
    type: SELECT_CABINET_END_DATETIME,
    end_datetime
  };
}

// API actions: api를 부를 때 사용

function fetchCabinetCostTypes() {
  return function(dispatch, getState) {
    const {
      user: { token, isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      fetch(`/payment/costtype/cabinet/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          dispatch(setCabinetCostTypes(json));
        });
    }
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
        dispatch(setSelCabinetBranch(json));
      });
  };
}

// iniital state
const initialState = {
  sel_start_datetime: null,
  sel_end_datetime: null,
  target_user: null,
  sel_cabinet_set: null,
  cabinets_to_enroll: [],
  is_enroll_cabinet: false,
  showEnrollCabinet_is_first: true,
  sel_cabinet_cost_type: null,
  sel_branch: null,
  cabinet_cost_types: [],
  temp_cabinet_set: null,
  all_info_complete: false,
  scroll_first: true
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ENROLL_CABINET:
      return applyResetEnrollCabinet(state, action);
    case SELECT_CABINET_START_DATETIME:
      return applySelectCabinetStartDatetime(state, action);
    case SELECT_CABINET_END_DATETIME:
      return applySelectCabinetEndDatetime(state, action);
    case SET_ENROLL_CABINET_TARGET_USER:
      return applySetEnrollCabinetTargetUser(state, action);
    case ADD_CABINET_TO_ENROLL:
      return applyAddCabinetToEnroll(state, action);
    case SUBTRACT_CABINET_TO_ENROLL:
      return applySubtractCabinetToEnroll(state, action);
    case SET_IS_ENROLL_CABINET:
      return applySetIsEnrollCabinet(state, action);
    case SET_IS_ENROLL_CABINET_NO:
      return applySetIsEnrollCabinetNo(state, action);
    case SET_SHOW_ENROLL_CABINET_IS_FIRST_FALSE:
      return applySetShowEnrollCabinetIsFirstFalse(state, action);
    case SET_SHOW_ENROLL_CABINET_IS_FIRST_TRUE:
      return applySetShowEnrollCabinetIsFirstTrue(state, action);
    case SET_CABINET_COST_TYPE:
      return applySetCabinetCostType(state, action);
    case SET_SEL_CABINET_BRANCH:
      return applySetSelCabinetBranch(state, action);
    case SET_SEL_CABINET_SET:
      return applySetSelCabinetSet(state, action);
    case SET_ENROLL_CABINET_START_DATETIME:
      return applySetEnrollCabinetStartDatettime(state, action);
    case SET_END_DATETIME:
      return applySetEndDatetime(state, action);
    case SET_CABINET_COST_TYPES:
      return applySetCabinetCostTypes(state, action);
    case SET_TEMP_CABINET_SET:
      return applySetTempCabinetSet(state, action);
    case RESET_TEMP_CABINET_SET:
      return applyResetTempCabinetSet(state, action);
    case ENROLL_CABINET_ALL_INFO_SETUP:
      return applyEnrollcabinetAllInfoSetup(state, action);
    case ENROLL_CABINET_ALL_INFO_NO_SETUP:
      return applyEnrollCabinetAllInfoNoSetup(state, action);
    case CLEAR_ENROLL_CABINET:
      return applyClearEnrollCabinet(state, action);
    case CLEAR_CABINET_SET:
      return applyClearCabinetSet(state, action);
    case SET_SCROLL_FIRST_FALSE:
      return applySetScrollFirstFalse(state, action);
    case CLEAR_SEL_CABINET_INFO:
      return applyClearSelCabinetInfo(state, action);
    default:
      return state;
  }
}

//reducer functions

function applyClearSelCabinetInfo(state, action) {
  //sel_cabinet_cost_type, sel_end_datetime

  return {
    ...state,
    sel_end_datetime: null,
    sel_start_datetime: null,
    cabinets_to_enroll: [],
    sel_cabinet_cost_type: null
  };
}

function applySetScrollFirstFalse(state, action) {
  return { ...state, scroll_first: false };
}

function applyClearCabinetSet(state, action) {
  return { ...state, sel_cabinet_set: null };
}

function applyClearEnrollCabinet(state, action) {
  return {
    ...initialState
  };
}

function applyEnrollCabinetAllInfoNoSetup(state, action) {
  return {
    ...state,
    all_info_complete: false
  };
}

function applyEnrollcabinetAllInfoSetup(state, action) {
  return {
    ...state,
    all_info_complete: true
  };
}

function applyResetTempCabinetSet(state, action) {
  return {
    ...state,
    temp_cabinet_set: null
  };
}

function applySetTempCabinetSet(state, action) {
  const { temp_cabinet_set } = action;
  return {
    ...state,
    temp_cabinet_set
  };
}

function applySetCabinetCostTypes(state, action) {
  const { cabinet_cost_types } = action;
  return {
    ...state,
    cabinet_cost_types
  };
}

function applySetEndDatetime(state, action) {
  const { sel_end_datetime } = action;
  return {
    ...state,
    sel_end_datetime
  };
}

function applySetEnrollCabinetStartDatettime(state, action) {
  const { sel_start_datetime } = action;
  return {
    ...state,
    sel_start_datetime
  };
}

function applySetSelCabinetSet(state, action) {
  const { sel_cabinet_set } = action;
  return {
    ...state,
    sel_cabinet_set
  };
}

function applySetSelCabinetBranch(state, action) {
  const { sel_branch } = action;
  return {
    ...state,
    sel_branch
  };
}

function applySetCabinetCostType(state, action) {
  const { sel_cabinet_cost_type } = action;
  return {
    ...state,
    sel_cabinet_cost_type
  };
}

function applySetShowEnrollCabinetIsFirstFalse(state, action) {
  return {
    ...state,
    showEnrollCabinet_is_first: false
  };
}

function applySetShowEnrollCabinetIsFirstTrue(state, action) {
  return {
    ...state,
    showEnrollCabinet_is_first: true
  };
}

function applySetIsEnrollCabinet(state, action) {
  return {
    ...state,
    is_enroll_cabinet: true
  };
}
function applySetIsEnrollCabinetNo(state, action) {
  return {
    ...state,
    is_enroll_cabinet: false,
    showEnrollCabinet_is_first: false
  };
}

function applyAddCabinetToEnroll(state, action) {
  const { cabinet } = action;

  //선택한 사물함이 이미 연장될 리스트에 포함되어 있다면
  if (
    !state.cabinets_to_enroll.find(
      cabinet_to_enroll => cabinet_to_enroll.id === cabinet.id
    )
  ) {
    return {
      ...state,
      cabinets_to_enroll: [...state.cabinets_to_enroll, cabinet]
    };
    // new_cabinet_to_enrolls.push(cabinet);
  } else {
    return {
      ...state,
      cabinets_to_enroll: state.cabinets_to_enroll.filter(function(
        cabinet_to_enroll
      ) {
        return cabinet_to_enroll.id !== cabinet.id;
      })
    };
  }
}

function applySubtractCabinetToEnroll(state, action) {
  const { cabinet } = action;

  return {
    ...state,
    cabinets_to_enroll: state.cabinets_to_enroll.filter(function(
      cabinet_to_enroll
    ) {
      return cabinet_to_enroll.id !== cabinet.id;
    })
  };
}

function applySetEnrollCabinetTargetUser(state, action) {
  const { target_user } = action;
  return {
    ...state,
    target_user
  };
}

function applySelectCabinetEndDatetime(state, action) {
  const { end_datetime } = action;
  return {
    ...state,
    end_datetime
  };
}

function applySelectCabinetStartDatetime(state, action) {
  const { start_datetime } = action;
  return {
    ...state,
    start_datetime
  };
}

function applyResetEnrollCabinet(state, action) {
  return {
    ...initialState,
    showEnrollCabinet_is_first: false
  };
}

const actionCreators = {
  resetEnrollCabinet,
  selectCabinetStartDatetime,
  selectCabinetEndDatetime,
  addCabinetToEnroll,
  subtractCabinetToEnroll,
  setIsEnrollCabinet,
  setIsEnrollCabinetNo,
  SetShowEnrollCabinetIsFirstFalse,
  setShowEnrollCabinetIsFirstTrue,
  setCabinetCostType,
  fetchSelBranch,
  fetchSelCabinetSet,
  setEnrollCabinetStartDatetime,
  setEndDatetime,
  fetchCabinetCostTypes,
  setTempCabinetSet,
  resetTempCabinetSet,
  enrollCabinetAllInfoSetup,
  enrollCabinetAllInfoNoSetup,
  clearEnrollCabinet,
  clearCabinetSet,
  setScrollFirstFalse,
  clearSelCabinetInfo,
  setEnrollCabinetTargetUser
};

export { actionCreators };

export default reducer;
