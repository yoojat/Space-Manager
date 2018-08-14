//imports
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_FOR_STAFF_EXPIRE_CABINET =
  "SET_CABINET_FOR_STAFF_EXPIRE_CABINET";
// const SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET =
//   "SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET";

function setCabinetForStaffExpireCabinet(cabinet) {
  return {
    type: SET_CABINET_FOR_STAFF_EXPIRE_CABINET,
    cabinet
  };
}

//action creators : 리덕스 state를 변경
// function setWindowShowTrue() {
//   return {
//     type: SET_WINDOW_SHOW_TRUE
//   };
// }

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

function expireCabinet() {
  return function(dispatch, getState) {
    const {
      user: { token },
      staffCabinetExpire: { sel_cabinet_for_expire }
    } = getState();

    fetch(`/cabinets/staff/expire/${sel_cabinet_for_expire.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status !== 202) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        const cabinet_id = json.id;
        dispatch(staffCabinetActions.fetchSelCabinet(cabinet_id));
        dispatch(staffCabinetActions.getCabinetDetail(cabinet_id));
      });
  };
}

// iniital state
const initialState = {
  sel_cabinet_for_expire: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_FOR_STAFF_EXPIRE_CABINET:
      return applySetCabinetForStaffExpireCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetCabinetForStaffExpireCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet_for_expire: cabinet
  };
}

//exports

const actionCreators = {
  setCabinetForStaffExpireCabinet,
  expireCabinet
};

export { actionCreators };
//reducer export

export default reducer;
