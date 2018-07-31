//imports
import { actionCreators as userActions } from "redux/modules/user";

//actions
const SET_BRANCH_INFO_FOR_SEAT_ADMIN = "SET_BRANCH_INFO_FOR_SEAT_ADMIN";
const SET_ROOM_FOR_SEAT_ADMIN = "SET_ROOM_FOR_SEAT_ADMIN";
const SET_ROOM_NULL_FOR_SEAT_ADMIN = "SET_ROOM_NULL_FOR_SEAT_ADMIN";
const SET_SEAT_FOR_SEAT_ADMIN = "SET_SEAT_FOR_SEAT_ADMIN";
const SET_SEAT_NULL_FOR_SEAT_ADMIN = "SET_SEAT_NULL_FOR_SEAT_ADMIN";
const SET_SERACHED_MEMBERS_NULL = "SET_SERACHED_MEMBERS_NULL";
const SET_SEARCHED_MEMBERS = "SET_SEARCHED_MEMBERS";
const SET_USER_FOR_SEAT_ADMIN = "SET_USER_FOR_SEAT_ADMIN";
const SET_USER_NULL_FOR_SEAT_ADMIN = "SET_USER_NULL_FOR_SEAT_ADMIN";

//action creators : 리덕스 state를 변경

function setUserNullForSeatAdmin() {
  return {
    type: SET_USER_NULL_FOR_SEAT_ADMIN
  };
}

function setUserForSeatAdmin(user) {
  return {
    type: SET_USER_FOR_SEAT_ADMIN,
    user
  };
}

function setSearchedMembers(members) {
  return {
    type: SET_SEARCHED_MEMBERS,
    members
  };
}

function setSearchedMembersNull() {
  return {
    type: SET_SERACHED_MEMBERS_NULL
  };
}

function setSeatNullForSeatAdmin() {
  return {
    type: SET_SEAT_NULL_FOR_SEAT_ADMIN
  };
}

function setSeatForSeatAdmin(seat_info) {
  return {
    type: SET_SEAT_FOR_SEAT_ADMIN,
    seat_info
  };
}

function setRoomNullForSeatAdmin() {
  return {
    type: SET_ROOM_NULL_FOR_SEAT_ADMIN
  };
}

function setRoomForSeatAdmin(room) {
  return {
    type: SET_ROOM_FOR_SEAT_ADMIN,
    room
  };
}

function setBranchInfo(branch) {
  return {
    type: SET_BRANCH_INFO_FOR_SEAT_ADMIN,
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

// 오늘 가입한 사람, 오늘 등록한 사람 모두 불러옴
function getUserForAllocate(user_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    dispatch(setUserNullForSeatAdmin());

    fetch(`/users/id/${user_id}`, {
      method: "GET",
      headers: {
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
        dispatch(setUserForSeatAdmin(json));
      });
  };
}

function getUsersBySearch(keyword) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/users/search/?keyword=${keyword}`, {
      method: "GET",
      headers: {
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
        dispatch(setSearchedMembers(json));
      });
  };
}

function getSeatInfo(seat_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    dispatch(setSeatNullForSeatAdmin());

    fetch(`/seats/detail/${seat_id}/`, {
      method: "GET",
      headers: {
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
        dispatch(setSeatForSeatAdmin(json));
      });
  };
}

function getBranchInfo(branch_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/branch/lounge/${branch_id}/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setBranchInfo(json));
      });
  };
}

function getRoomSeats(roomId) {
  return (dispatch, getState) => {
    dispatch(setRoomNullForSeatAdmin());
    const {
      user: { token }
    } = getState();
    return fetch(`/rooms/room/${roomId}/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setRoomForSeatAdmin(json));
        return true;
      });
  };
}

// iniital state
const initialState = {
  sel_branch_for_seat_man: null,
  sel_room_for_seat_man: null,
  sel_seat_for_seat_man: null,
  searched_members: null,
  sel_user_for_seat_man: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCH_INFO_FOR_SEAT_ADMIN:
      return applySetBranchInfoForSeatAdmin(state, action);

    case SET_ROOM_FOR_SEAT_ADMIN:
      return applySetRoomForSeatAdmin(state, action);

    case SET_ROOM_NULL_FOR_SEAT_ADMIN:
      return applySetRoomNullForSeatAdmin(state, action);

    case SET_SEAT_FOR_SEAT_ADMIN:
      return applySetSeatForSeatAdmin(state, action);

    case SET_SEAT_NULL_FOR_SEAT_ADMIN:
      return applySetSeatNullForSeatAdmin(state, action);

    case SET_SERACHED_MEMBERS_NULL:
      return applySetSearcehdMembersNull(state, action);

    case SET_SEARCHED_MEMBERS:
      return applySetSearcehdMembers(state, action);

    case SET_USER_FOR_SEAT_ADMIN:
      return applySetUserForSeatAdmin(state, action);

    case SET_USER_NULL_FOR_SEAT_ADMIN:
      return applySetUserNullForSeatAdmin(state, action);

    default:
      return state;
  }
}
//reducer functions

function applySetUserNullForSeatAdmin(state, action) {
  return {
    ...state,
    sel_user_for_seat_man: null
  };
}

function applySetUserForSeatAdmin(state, action) {
  const { user } = action;
  return {
    ...state,
    sel_user_for_seat_man: user
  };
}

function applySetSearcehdMembers(state, action) {
  const { members } = action;
  return {
    ...state,
    searched_members: members
  };
}

function applySetSearcehdMembersNull(state, action) {
  return {
    ...state,
    searched_members: null
  };
}

function applySetSeatNullForSeatAdmin(state, action) {
  return {
    ...state,
    sel_seat_for_seat_man: null
  };
}

function applySetSeatForSeatAdmin(state, action) {
  const { seat_info } = action;
  return {
    ...state,
    sel_seat_for_seat_man: seat_info
  };
}

function applySetRoomNullForSeatAdmin(state, action) {
  return {
    ...state,
    sel_room_for_seat_man: null
  };
}

function applySetRoomForSeatAdmin(state, action) {
  const { room } = action;

  return {
    ...state,
    sel_room_for_seat_man: room
  };
}

function applySetBranchInfoForSeatAdmin(state, action) {
  const { branch } = action;
  return {
    ...state,
    sel_branch_for_seat_man: branch
  };
}
//exports

const actionCreators = {
  getBranchInfo,
  getRoomSeats,
  getSeatInfo,
  getUsersBySearch,
  setSearchedMembersNull,
  getUserForAllocate
};

export { actionCreators };
//reducer export

export default reducer;
