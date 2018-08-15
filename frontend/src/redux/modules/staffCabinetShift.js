//imports
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_FOR_STAFF_SHIFT_CABINET =
  "SET_CABINET_FOR_STAFF_SHIFT_CABINET";

const SET_BRANCH_FOR_STAFF_SHIFT_CABINET = "SET_BRANCH_FOR_STAFF_SHIFT_CABINET";

const CLEAR_CABINET_SET_FOR_STAFF_SHIFT_CABINET =
  "CLEAR_CABINET_SET_FOR_STAFF_SHIFT_CABINET";

const SET_CABINET_SET_FOR_STAFF_SHIFT_CABINET =
  "SET_CABINET_SET_FOR_STAFF_SHIFT_CABINET";

const SET_TARGET_CABINET_FOR_STAFF_SHIFT_CABINET =
  "SET_TARGET_CABINET_FOR_STAFF_SHIFT_CABINET";

const SET_SCROLL_FIRST_FALSE_FOR_STAFF_SHIFT_CABINET =
  "SET_SCROLL_FIRST_FALSE_FOR_STAFF_SHIFT_CABINET";

const SET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET =
  "SET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET";

const RESET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET =
  "RESET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET";

//action creators : 리덕스 state를 변경

function resetTempCabinetSetForStaffShiftCabinet() {
  return {
    type: RESET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET
  };
}

function setTempCabinetSetForStaffShiftCabinet(temp_cabinet_set) {
  return {
    type: SET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET,
    temp_cabinet_set
  };
}

function setScrollFirstFalseStaffCabinet() {
  return {
    type: SET_SCROLL_FIRST_FALSE_FOR_STAFF_SHIFT_CABINET
  };
}

function setTargetCabinetForStaffShiftCabinet(target_cabinet) {
  return {
    type: SET_TARGET_CABINET_FOR_STAFF_SHIFT_CABINET,
    target_cabinet
  };
}

function setCabinetSetForStaffShiftCabinet(cabinet_set) {
  return {
    type: SET_CABINET_SET_FOR_STAFF_SHIFT_CABINET,
    cabinet_set
  };
}

function clearCabinetSetForStaffShiftCabinet() {
  return {
    type: CLEAR_CABINET_SET_FOR_STAFF_SHIFT_CABINET
  };
}

function setCabinetForStaffShiftCabinet(cabinet) {
  return {
    type: SET_CABINET_FOR_STAFF_SHIFT_CABINET,
    cabinet
  };
}

function setBranchForStaffShiftCabinet(branch) {
  return {
    type: SET_BRANCH_FOR_STAFF_SHIFT_CABINET,
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

function shiftCabinet() {
  return (dispatch, getState) => {
    const {
      user: { token },
      staffCabinetShift: { sel_cabinet_for_shift, target_cabinet }
    } = getState();

    fetch(`/cabinets/staff/shift/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        target_cabinet_id: target_cabinet.id,
        before_cabinet_id: sel_cabinet_for_shift.id
      })
    })
      .then(response => {
        if (response.status !== 201) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(staffCabinetActions.fetchSelCabinetSet(json.cabinet_set.id));
        dispatch(staffCabinetActions.fetchSelCabinet(json.id));
        dispatch(staffCabinetActions.getCabinetDetail(json.id));
        console.log("성공", json);
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
        dispatch(setBranchForStaffShiftCabinet(json));
      });
  };
}

// 기존 사물함 정리완료
// 새로 사물함 등록

function fetchSelCabinetSet(cabinet_set_id) {
  return function(dispatch, getState) {
    dispatch(clearCabinetSetForStaffShiftCabinet());

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
          dispatch(setCabinetSetForStaffShiftCabinet(json));
        });
    }
  };
}
// iniital state
const initialState = {
  sel_cabinet_for_shift: null,
  sel_branch: null,
  sel_cabinet_set: null,
  target_cabinet: null,
  scroll_first: true,
  temp_cabinet_set: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_FOR_STAFF_SHIFT_CABINET:
      return applySetCabinetForStaffShiftCabinet(state, action);

    case SET_BRANCH_FOR_STAFF_SHIFT_CABINET:
      return applySetBranchForStaffShiftCabinet(state, action);

    case CLEAR_CABINET_SET_FOR_STAFF_SHIFT_CABINET:
      return applyClearCabinetSetForStaffShiftCabinet(state, action);

    case SET_CABINET_SET_FOR_STAFF_SHIFT_CABINET:
      return applySetCabinetSetForStaffShiftCabinet(state, action);

    case SET_TARGET_CABINET_FOR_STAFF_SHIFT_CABINET:
      return applySetTargetCabinetForStaffShiftCabinet(state, action);

    case SET_SCROLL_FIRST_FALSE_FOR_STAFF_SHIFT_CABINET:
      return applySetScrollFirstFalseForStaffShiftCabinet(state, action);

    case SET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET:
      return applySetTempCabinetSetForStaffShiftCabinet(state, action);

    case RESET_TEMP_CABINET_SET_FOR_STAFF_SHIFT_CABINET:
      return applyResetTempCabinetSetForStaffShiftCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applyResetTempCabinetSetForStaffShiftCabinet(state, action) {
  return {
    ...state,
    temp_cabinet_set: initialState.temp_cabinet_set
  };
}

function applySetTempCabinetSetForStaffShiftCabinet(state, action) {
  const { temp_cabinet_set } = action;
  return {
    ...state,
    temp_cabinet_set
  };
}

function applySetScrollFirstFalseForStaffShiftCabinet(state, action) {
  return {
    ...state,
    scroll_first: false
  };
}

function applySetTargetCabinetForStaffShiftCabinet(state, action) {
  const { target_cabinet } = action;

  return {
    ...state,
    target_cabinet
  };
}

function applySetCabinetSetForStaffShiftCabinet(state, action) {
  const { cabinet_set } = action;
  return {
    ...state,
    sel_cabinet_set: cabinet_set
  };
}

function applyClearCabinetSetForStaffShiftCabinet(state, action) {
  return {
    ...state,
    sel_cabinet_set: initialState.sel_cabinet_set
  };
}

function applySetBranchForStaffShiftCabinet(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch: branch
  };
}

function applySetCabinetForStaffShiftCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet_for_shift: cabinet
  };
}

//exports

const actionCreators = {
  setCabinetForStaffShiftCabinet,
  getSelBranch,
  fetchSelCabinetSet,
  setTargetCabinetForStaffShiftCabinet,
  setScrollFirstFalseStaffCabinet,
  setTempCabinetSetForStaffShiftCabinet,
  resetTempCabinetSetForStaffShiftCabinet,
  clearCabinetSetForStaffShiftCabinet,
  shiftCabinet
};

export { actionCreators };
//reducer export

export default reducer;
