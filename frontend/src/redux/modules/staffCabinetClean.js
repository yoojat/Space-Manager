//imports
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_FOR_STAFF_CLEAN_CABINET =
  "SET_CABINET_FOR_STAFF_CLEAN_CABINET";

//action creators : 리덕스 state를 변경
function setCabinetForStaffCleanCabinet(cabinet) {
  return {
    type: SET_CABINET_FOR_STAFF_CLEAN_CABINET,
    cabinet
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

function cleanCabinet() {
  return function(dispatch, getState) {
    const {
      user: { token },
      staffCabinet: { sel_cabinet_set },
      staffCabinetClean: { sel_cabinet_for_clean }
    } = getState();

    fetch(`/cabinets/staff/clean/${sel_cabinet_for_clean.id}/`, {
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
      .then(async json => {
        const cabinet_id = json.id;
        await dispatch(
          staffCabinetActions.fetchSelCabinetSet(sel_cabinet_set.id)
        );
        await dispatch(staffCabinetActions.fetchSelCabinet(cabinet_id));
        dispatch(staffCabinetActions.getCabinetDetail(cabinet_id));
      });
  };
}

// iniital state
const initialState = {
  sel_cabinet_for_clean: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_FOR_STAFF_CLEAN_CABINET:
      return applySetCabinetForStaffCleanCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetCabinetForStaffCleanCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet_for_clean: cabinet
  };
}

//exports

const actionCreators = {
  setCabinetForStaffCleanCabinet,
  cleanCabinet
};

export { actionCreators };
//reducer export

export default reducer;
