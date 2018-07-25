// imports
import moment from "moment";

//actions
const SET_EXTEND_MEMBERSHIP_COMPLETE = "SET_EXTEND_MEMBERSHIP_COMPLETE";
const SET_EXTEND_MEMBERSHIP_NOT_COMPLETE = "SET_EXTEND_MEMBERSHIP_NOT_COMPLETE";
const SET_ENROLL_MEMBERSHIP_COMPLETE = "SET_ENROLL_MEMBERSHIP_COMPLETE";
const SET_ENROLL_MEMBERSHIP_NOT_COMPLETE = "SET_ENROLL_MEMBERSHIP_NOT_COMPLETE";
const SET_ENROLL_CABINET_COMPLETE = "SET_ENROLL_CABINET_COMPLETE";
const SET_ENROLL_CABINET_NOT_COMPLETE = "SET_ENROLL_CABINET_NOT_COMPLETE";
const SET_EXTEND_CABINET_COMPLETE = "SET_EXTEND_CABINET_COMPLETE";
const SET_EXTEND_CABINET_NOT_COMPLETE = "SET_EXTEND_CABINET_NOT_COMPLETE";
const SET_NOW_DATETIME = "SET_NOW_DATETIME";
const CLEAR_SET_UP_INFO = "CLEAR_SET_UP_INFO";

//action creators : 리덕스 state를 변경

function clearSetupInfo() {
  return {
    type: CLEAR_SET_UP_INFO
  };
}
function setNowDatetime() {
  return {
    type: SET_NOW_DATETIME
  };
}

function setExtendMembershipComplete() {
  return {
    type: SET_EXTEND_MEMBERSHIP_COMPLETE
  };
}

function setExtendMembershipNotComplete() {
  return {
    type: SET_EXTEND_MEMBERSHIP_NOT_COMPLETE
  };
}

function setEnrollMembershipComplete() {
  return {
    type: SET_ENROLL_MEMBERSHIP_COMPLETE
  };
}

function setEnrollMembershipNotComplete() {
  return {
    type: SET_ENROLL_MEMBERSHIP_NOT_COMPLETE
  };
}

function setEnrollCabinetComplete() {
  return {
    type: SET_ENROLL_CABINET_COMPLETE
  };
}

function setEnrollCabinetNotComplete() {
  return {
    type: SET_ENROLL_CABINET_NOT_COMPLETE
  };
}

function setExtendCabinetComplete() {
  return {
    type: SET_EXTEND_CABINET_COMPLETE
  };
}

function setExtendCabinetNotComplete() {
  return {
    type: SET_EXTEND_CABINET_NOT_COMPLETE
  };
}

// API actions: api를 부를 때 사용

// iniital state
const initialState = {
  extendMembershipComplete: false,
  enrollMembershipComplete: false,
  enrollCabinetComplete: false,
  extendCabinetComplete: false,
  now_datetime: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXTEND_MEMBERSHIP_COMPLETE:
      return applyExtendMembershipComplete(state, action);
    case SET_EXTEND_MEMBERSHIP_NOT_COMPLETE:
      return applyExtendMembershipNotComplete(state, action);
    case SET_ENROLL_MEMBERSHIP_COMPLETE:
      return applyEnrollMembershipComplete(state, action);
    case SET_ENROLL_MEMBERSHIP_NOT_COMPLETE:
      return applyEnrollMembershipNotComplete(state, action);
    case SET_ENROLL_CABINET_COMPLETE:
      return applyEnrollCabinetComplete(state, action);
    case SET_ENROLL_CABINET_NOT_COMPLETE:
      return applyEnrollCabinetNotComplete(state, action);
    case SET_EXTEND_CABINET_COMPLETE:
      return applyExtendCabinetComplete(state, action);
    case SET_EXTEND_CABINET_NOT_COMPLETE:
      return applyExtendCabinetNotComplete(state, action);
    case SET_NOW_DATETIME:
      return applySetNowDatetime(state, action);
    case CLEAR_SET_UP_INFO:
      return applyClearSetUpInfo(state, action);
    default:
      return state;
  }
}
//reducer functions

function applyClearSetUpInfo(state, action) {
  return {
    ...initialState
  };
}

function applySetNowDatetime(state, action) {
  return {
    ...state,
    now_datetime: moment().format("YYYY-MM-DD HH:mm:ss")
  };
}

function applyExtendMembershipComplete(state, action) {
  return {
    ...state,
    extendMembershipComplete: true
  };
}
function applyExtendMembershipNotComplete(state, action) {
  return {
    ...state,
    extendMembershipComplete: false
  };
}
function applyEnrollMembershipComplete(state, action) {
  return {
    ...state,
    enrollMembershipComplete: true
  };
}

function applyEnrollMembershipNotComplete(state, action) {
  return {
    ...state,
    enrollMembershipComplete: false
  };
}
function applyEnrollCabinetComplete(state, action) {
  return {
    ...state,
    enrollCabinetComplete: true
  };
}
function applyEnrollCabinetNotComplete(state, action) {
  return {
    ...state,
    enrollCabinetComplete: false
  };
}
function applyExtendCabinetComplete(state, action) {
  return {
    ...state,
    extendCabinetComplete: true
  };
}
function applyExtendCabinetNotComplete(state, action) {
  return {
    ...state,
    extendCabinetComplete: false
  };
}
//exports

const actionCreators = {
  setExtendMembershipComplete,
  setExtendMembershipNotComplete,
  setEnrollMembershipComplete,
  setEnrollMembershipNotComplete,
  setEnrollCabinetComplete,
  setEnrollCabinetNotComplete,
  setExtendCabinetComplete,
  setExtendCabinetNotComplete,
  setNowDatetime,
  clearSetupInfo
};

export { actionCreators };
//reducer export

export default reducer;
