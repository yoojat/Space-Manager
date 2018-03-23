//imports

import {actionCreators as userActions} from 'redux/modules/user';

//actions

const SET_ROOM_SEATS = 'SET_ROOM_SEATS';
const ALLOCATE_SEAT = 'ALLOCATE_SEAT';
const RETURN_SEAT = 'RETURN_SEAT';

//action creators : 리덕스 state를 변경

function setRoomSeats(room) {
  return {
    type: SET_ROOM_SEATS,
    room,
  };
}

function doAllocateSeat(seatId) {
  return {
    type: ALLOCATE_SEAT,
    seatId,
  };
}

function doReturnSeat(seatId) {
  return {
    type: RETURN_SEAT,
    seatId,
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

function allocateSeat(seatId) {
  return (dispatch, getState) => {
    dispatch(doAllocateSeat(seatId));
    fetch(`/`);
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
    case ALLOCATE_SEAT:
      return applyAllocateSeat(state, action);
    case RETURN_SEAT:
      return applyReturnSeat(state, action);
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

function applyAllocateSeat(state, action) {
  const {seatId} = action;
  const {room: {seats}} = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        image_url: require('images/loading_seat.png'),
        now_using: true,
      };
    }
    return seat;
  });
  return {...state, room: {...state.room, seats: updatedSeats}};
}

function applyReturnSeat(state, action) {
  const {seatId} = action;
  const {room: {seats}} = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        image_url: null,
        now_using: false,
      };
    }
    return seat;
  });
  return {...state, seat: {room: {seats: updatedSeats}}};
}
//exports

const actionCreators = {
  getRoomSeats,
};

export {actionCreators};
//reducer export

export default reducer;
