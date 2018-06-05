// imports

//actions
const RESET_ENROLL = "RESET_ENROLL"; //선택한 정보들을 모두 초기화
const SELECT_BRANCH = "SELECT_BRANCH"; // 지점 선택
const SELECT_START_DATETIME = "SELECT_START_DATETIME"; //시작 날짜 선택
const SELECT_END_DATETIME = "SELECT_END_DATETIME"; // 만료 날짜 선택
const SET_TARGET_USER = "SET_TARGET_USER"; // 타겟 유저 선택
//action creators : 리덕스 state를 변경

function setUser(target_user) {
  return {
    type: SET_TARGET_USER,
    target_user
  };
}

//지점선택
function selectBranch(branch) {
  return {
    type: SELECT_BRANCH,
    sel_branch: branch
  };
}

function resetEnroll() {
  return {
    type: RESET_ENROLL
  };
}

function selectStartDatetime(start_datetime) {
  return {
    type: SELECT_START_DATETIME,
    start_datetime
  };
}

function selectEndDatetime(end_datetime) {
  return {
    type: SELECT_END_DATETIME,
    end_datetime
  };
}

// API actions: api를 부를 때 사용

function setNowUser() {
  return (dispatch, getState) => {
    const {
      user: { id }
    } = getState();
    dispatch(setUser(id));
  };
}

// iniital state
const initialState = {
  sel_branch: null,
  start_datetime: null,
  end_datetime: null,
  target_user: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_BRANCH:
      return applySelectBranch(state, action);
    case RESET_ENROLL:
      return applyResetEnroll(state, action);
    case SELECT_START_DATETIME:
      return applySelectStartDatetime(state, action);
    case SELECT_END_DATETIME:
      return applySelectEndDatetime(state, action);
    case SET_TARGET_USER:
      return applySetTargetUser(state, action);
    default:
      return state;
  }
}

//reducer functions

function applySetTargetUser(state, action) {
  const { target_user } = action;
  return {
    ...state,
    target_user
  };
}

function applySelectEndDatetime(state, action) {
  const { end_datetime } = action;
  return {
    ...state,
    end_datetime
  };
}

function applySelectStartDatetime(state, action) {
  const { start_datetime } = action;
  return {
    ...state,
    start_datetime
  };
}

function applySelectBranch(state, action) {
  const { sel_branch } = action;
  return {
    ...state,
    sel_branch
  };
}

function applyResetEnroll(state, action) {
  return {
    ...initialState
  };
}

const actionCreators = {
  selectBranch,
  resetEnroll,
  selectStartDatetime,
  selectEndDatetime,
  setNowUser
};

export { actionCreators };

export default reducer;
