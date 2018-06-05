// imports

//actions
const RESET_ENROLL_CABINET = "RESET_ENROLL_CABINET"; //선택한 정보들을 모두 초기화
const SELECT_CABINET_START_DATETIME = "SELECT_CABINET_START_DATETIME"; //시작 날짜 선택
const SELECT_CABINET_END_DATETIME = "SELECT_CABINET_END_DATETIME"; // 만료 날짜 선택
const SET_CABINET_TARGET_USER = "SET_CABINET_TARGET_USER"; // 타겟 유저 선택
//action creators : 리덕스 state를 변경

function setCabinetUser(target_user) {
  return {
    type: SET_CABINET_TARGET_USER,
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

function setNowUser() {
  return (dispatch, getState) => {
    const {
      user: { id }
    } = getState();
    dispatch(setCabinetUser(id));
  };
}

// iniital state
const initialState = {
  start_datetime: null,
  end_datetime: null,
  target_user: null
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
    case SET_CABINET_TARGET_USER:
      return applySetCabinetTargetUser(state, action);
    default:
      return state;
  }
}

//reducer functions

function applySetCabinetTargetUser(state, action) {
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
    ...initialState
  };
}

const actionCreators = {
  resetEnrollCabinet,
  selectCabinetStartDatetime,
  selectCabinetEndDatetime,
  setNowUser
};

export { actionCreators };

export default reducer;
