//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions

const SET_ROOM_SEATS = 'SET_ROOM_SEATS';

//action creators : 리덕스 state를 변경

function setRoomSeats(room) {
  return {
    type: SET_ROOM_SEATS,
    room,
  };
}
// API actions: api를 부를 때 사용

function getRoomSeats(roomId) {
  return (dispatch, getState) => {
    const {user: {token}} = getState();
    fetch(`/rooms/room/${roomId}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setRoomSeats(json));
      });
  };
}

// function assignSeat(seatId) {
//   return (dispatch, getState) => {
//     dispatch(doAssignSeat(seatId));
//   };
// }

// iniital state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_SEATS:
      return applySetRoomSeats(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetRoomSeats(state, action) {
  const {room} = action;
  return {
    ...state,
    room,
  };
}
//exports

const actionCreators = {
  getRoomSeats,
};

export {actionCreators};
//reducer export

export default reducer;
