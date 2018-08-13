//imports
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as staffCabinetActions } from "redux/modules/staffCabinet";

//actions
const SET_CABINET_FOR_STAFF_EXTEND_CABINET =
  "SET_CABINET_FOR_STAFF_EXTEND_CABINET";
const SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET =
  "SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET";

function setCabinetForStaffExtendCabinet(cabinet) {
  return {
    type: SET_CABINET_FOR_STAFF_EXTEND_CABINET,
    cabinet
  };
}

function setExpireDatetimeForStaffExtendCabinet(sel_datetime) {
  return {
    type: SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET,
    sel_datetime
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

// 오늘 가입한 사람, 오늘 등록한 사람 모두 불러옴

function extendCabinet() {
  return function(dispatch, getState) {
    const {
      user: { token },
      staffCabinetExtend: { sel_cabinet_for_extend, end_datetime }
    } = getState();

    fetch(`/cabinets/staff/extend/${sel_cabinet_for_extend.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        end_datetime
      })
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

// function enrollCabinet() {
//   return function(dispatch, getState) {
//     const {
//       user: { token },
//       staffCabinet
//     } = getState();

//     fetch(`/cabinets/enrollCabinets/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `JWT ${token}`
//       },
//       body: JSON.stringify({
//         is_clean: false,
//         cabinets: [staffCabinet.sel_cabinet],
//         start_date: staffCabinet.sel_start_datetime,
//         end_date: staffCabinet.sel_end_datetime,
//         user: staffCabinet.target_user.id
//       })
//     })
//       .then(response => {
//         if (response.status !== 202) {
//           dispatch(userActions.logout());
//         }
//         return response.json();
//       })
//       .then(json => {
//         dispatch(registCabinetLog(json.id));
//       });
//   };
// }

// iniital state
const initialState = {
  sel_cabinet_for_extend: null,
  end_datetime: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CABINET_FOR_STAFF_EXTEND_CABINET:
      return applySetCabinetForStaffExtendCabinet(state, action);

    case SET_EXPIRE_DATETIME_FOR_STAFF_EXTEND_CABINET:
      return applySetExpireDatetimeForStaffExtendCabinet(state, action);
    default:
      return state;
  }
}
//reducer functions

function applySetCabinetForStaffExtendCabinet(state, action) {
  const { cabinet } = action;
  return {
    ...state,
    sel_cabinet_for_extend: cabinet
  };
}

function applySetExpireDatetimeForStaffExtendCabinet(state, action) {
  const { sel_datetime } = action;
  return {
    ...state,
    end_datetime: sel_datetime
  };
}

//exports

const actionCreators = {
  setCabinetForStaffExtendCabinet,
  setExpireDatetimeForStaffExtendCabinet,
  extendCabinet
};

export { actionCreators };
//reducer export

export default reducer;
