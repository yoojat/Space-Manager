//imports
import { actionCreators as userActions } from "redux/modules/user";
// import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_LOCKS = "SET_CABINET_LOCKS";
const SET_CABINET_LOCKS_NULL = "SET_CABINET_LOCKS_NULL";
const SET_BRANCHES_FOR_CABINET_LOCKS = "SET_BRANCHES_FOR_CABINET_LOCKS";
const SET_BRANCH_FOR_CABINET_LOCKS = "SET_BRANCH_FOR_CABINET_LOCKS";
const MODAL_WINDOW_SHOW_TRUE = "MODAL_WINDOW_SHOW_TRUE";
const MODAL_WINDOW_SHOW_FALSE = "MODAL_WINDOW_SHOW_FALSE";
const SET_CABINETS_FOR_CABINET_LOCK = "SET_CABINETS_FOR_CABINET_LOCK";
const SET_CABINETS_NULL_FOR_CABINET_LOCK = "SET_CABINETS_NULL_FOR_CABINET_LOCK";
const SET_TEMP_CABINET_FOR_CABINET_LOCK = "SET_TEMP_CABINET_FOR_CABINET_LOCK";
const SET_MODIFY_CABINET_LOCK = "SET_MODIFY_CABINET_LOCK";

//action creators : 리덕스 state를 변경

function setModifyCabinetLock(cab_lock) {
  return {
    type: SET_MODIFY_CABINET_LOCK,
    cab_lock
  };
}

function setTempCabinetForCabinetLock(cabinet) {
  return {
    type: SET_TEMP_CABINET_FOR_CABINET_LOCK,
    cabinet
  };
}

function setCabinetsNullForCabinetLock() {
  return {
    type: SET_CABINETS_NULL_FOR_CABINET_LOCK
  };
}

function setCabinetsForCabinetLock(cabinets) {
  return {
    type: SET_CABINETS_FOR_CABINET_LOCK,
    cabinets
  };
}

function setModalWindowShowFalse() {
  return {
    type: MODAL_WINDOW_SHOW_FALSE
  };
}

function setModalWindowShowTrue() {
  return {
    type: MODAL_WINDOW_SHOW_TRUE
  };
}

function setCabinetLockNull() {
  return {
    type: SET_CABINET_LOCKS_NULL
  };
}

function setBranchForCabinetLocks(sel_branch) {
  return {
    type: SET_BRANCH_FOR_CABINET_LOCKS,
    sel_branch
  };
}

function setCabinetLocks(cabinet_locks) {
  return {
    type: SET_CABINET_LOCKS,
    cabinet_locks
  };
}

function setBranchesForCabinetLocks(branches) {
  return {
    type: SET_BRANCHES_FOR_CABINET_LOCKS,
    branches
  };
}

// API actions: api를 부를 때 사용

function getCabinetLockByLockId(lock_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/cabinets/staff/cablock/lockid/${lock_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        dispatch(setModifyCabinetLock(json));
      });
  };
}

function getCabinetLockByCabId(cabinet_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();
    fetch(`/cabinets/staff/cablock/${cabinet_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        dispatch(setTempCabinetForCabinetLock(json));
      });
  };
}

function fetchCabinets(branch_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    dispatch(setCabinetsNullForCabinetLock());

    fetch(`/cabinets/staff/cabinets/${branch_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        dispatch(setCabinetsForCabinetLock(json));
      });
  };
}

function deleteLock(lock_id) {
  return function(dispatch, getState) {
    const {
      user: { token },
      staffCabinetLock: { sel_branch }
    } = getState();

    fetch(`/cabinets/staff/cablock/delete/${lock_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status !== 204) {
        dispatch(userActions.logout());
      } else {
        dispatch(fetchCabinetLocks(sel_branch.id));
        dispatch(setModalWindowShowFalse());
      }
    });
  };
}

function addLock(branch_id, cabinet_id, lock_number, password) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/cabinets/staff/cablock/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        branch_id,
        cabinet_id,
        lock_number,
        password
      })
    })
      .then(response => {
        if (response.status !== 201) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(fetchCabinetLocks(branch_id));
        dispatch(setModalWindowShowFalse());
      });
  };
}

function fetchBranches() {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();

    fetch(`/branch/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        dispatch(setBranchesForCabinetLocks(json));
      });
  };
}

function fetchCabinetLocks(branch_id) {
  return function(dispatch, getState) {
    const {
      user: { token }
    } = getState();
    dispatch(setCabinetLockNull());
    fetch(`/cabinets/locks/${branch_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(async json => {
        dispatch(setCabinetLocks(json));
      });
  };
}

// iniital state
const initialState = {
  cabinet_locks: null,
  branches: null,
  sel_branch: null,
  modal_show: false,
  cabinets: null,
  temp_cabinet: [],
  cab_lock_modify: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_LOCKS:
      return applySetCabinetLocks(state, action);

    case SET_BRANCHES_FOR_CABINET_LOCKS:
      return applySetBranchesForCabinetLocks(state, action);

    case SET_BRANCH_FOR_CABINET_LOCKS:
      return applySetBranchForCabinetLocks(state, action);

    case SET_CABINET_LOCKS_NULL:
      return applySetCabinetLocksNull(state, action);

    case MODAL_WINDOW_SHOW_TRUE:
      return applyModalWindowShowTrue(state, action);

    case MODAL_WINDOW_SHOW_FALSE:
      return applyModalWindowShowFalse(state, action);

    case SET_CABINETS_FOR_CABINET_LOCK:
      return applySetCabinetsForCabinetLock(state, action);

    case SET_CABINETS_NULL_FOR_CABINET_LOCK:
      return applySetCabinetsNullForCabinetLock(state, action);

    case SET_TEMP_CABINET_FOR_CABINET_LOCK:
      return applySetTempCabinetForCabinetLock(state, action);

    case SET_MODIFY_CABINET_LOCK:
      return applySetModifyCabinetLock(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetModifyCabinetLock(state, action) {
  const { cab_lock } = action;
  return {
    ...state,
    cab_lock_modify: cab_lock
  };
}

function applySetTempCabinetForCabinetLock(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    temp_cabinet: cabinet
  };
}

function applySetCabinetsNullForCabinetLock(state, action) {
  return {
    ...state,
    cabinets: initialState.cabinets
  };
}

function applySetCabinetsForCabinetLock(state, action) {
  const { cabinets } = action;
  return {
    ...state,
    cabinets
  };
}

function applyModalWindowShowFalse(state, action) {
  return {
    ...state,
    modal_show: false
  };
}

function applyModalWindowShowTrue(state, action) {
  return {
    ...state,
    modal_show: true
  };
}

function applySetCabinetLocksNull(state, action) {
  return {
    ...state,
    cabinet_locks: initialState.cabinet_locks
  };
}

function applySetBranchForCabinetLocks(state, action) {
  const { sel_branch } = action;
  return {
    ...state,
    sel_branch
  };
}

function applySetBranchesForCabinetLocks(state, action) {
  const { branches } = action;
  return {
    ...state,
    branches
  };
}

function applySetCabinetLocks(state, action) {
  const { cabinet_locks } = action;
  return {
    ...state,
    cabinet_locks
  };
}

//exports

const actionCreators = {
  fetchCabinetLocks,
  fetchBranches,
  setBranchForCabinetLocks,
  setCabinetLockNull,
  addLock,
  setModalWindowShowFalse,
  setModalWindowShowTrue,
  fetchCabinets,
  getCabinetLockByCabId,
  deleteLock,
  getCabinetLockByLockId
};

export { actionCreators };
//reducer export

export default reducer;
