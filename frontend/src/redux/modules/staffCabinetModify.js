//imports
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_FOR_STAFF_MODIFY_CABINET =
  "SET_CABINET_FOR_STAFF_MODIFY_CABINET";

//action creators : 리덕스 state를 변경
function setCabinetForStaffModifyCabinet(cabinet) {
  return {
    type: SET_CABINET_FOR_STAFF_MODIFY_CABINET,
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

function modifyCabinet(start_datetime, end_datetime) {
  return function(dispatch, getState) {
    const {
      user: { token },
      staffCabinet: { sel_cabinet_set },
      staffCabinetModify: { sel_cabinet_for_modify }
    } = getState();

    fetch(`/cabinets/staff/modify/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        target_cabinet_id: sel_cabinet_for_modify.id,
        start_datetime,
        end_datetime
      })
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
  sel_cabinet_for_modify: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_FOR_STAFF_MODIFY_CABINET:
      return applySetCabinetForStaffModifyCabinet(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetCabinetForStaffModifyCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet_for_modify: cabinet
  };
}

//exports

const actionCreators = {
  setCabinetForStaffModifyCabinet,
  modifyCabinet
};

export { actionCreators };
//reducer export

export default reducer;
