//imports

import {actionCreators as userActions} from 'redux/modules/user';
import {actionCreators as branchActions} from 'redux/modules/branch';

//actions

const SET_ROOM_SEATS = 'SET_ROOM_SEATS';
const ALLOCATE_SEAT = 'ALLOCATE_SEAT';
const CANCEL_ALLOCATE_SEAT = 'CANCEL_ALLOCATE_SEAT';

//action creators : 리덕스 state를 변경

function setRoomSeats (room) {
  return {
    type: SET_ROOM_SEATS,
    room,
  };
}

function doAllocateSeat (seatId) {
  return {
    type: ALLOCATE_SEAT,
    seatId,
  };
}

function doCancelAllocateSeat (seatId) {
  return {
    type: CANCEL_ALLOCATE_SEAT,
    seatId,
  };
}

// API actions: api를 부를 때 사용

function getRoomSeats (roomId) {
  return (dispatch, getState) => {
    const {user: {token}} = getState ();
    fetch (`/rooms/room/${roomId}/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then (response => {
        if (response.status === 401) {
          dispatch (userActions.logout ());
        }
        return response.json ();
      })
      .then (json => {
        dispatch (setRoomSeats (json));
      });
  };
}

// is_superuser or is_staff or mebership 확인 => redux
// 이전에 자리잡은 것 있나 확인 => redux
// 지점 옵션에 걸리는지 확인(지점 이동 금지, 여성,남성,나이 제한) =>redux
// 사용가능한 열람실인지 확인 => redux
// 현재 좌석이 이용불가 상태가 아닌지 확인 =>redux
// 현재 좌석에 누가 이용중인지 확인 => backend
// 사용자가 사용하고 있는 좌석이 있는지 확인하고 있으면 반납처리하고 다시 잡을 것 => redux
// 남성전용 여성전용 공용 확인 => redux

function allocateSeat (seatId, roomId) {
  return (dispatch, getState) => {
    const {user: {id, token}} = getState ();
    const allocateFunc = roomId => {
      dispatch (getRoomSeats (roomId));
      dispatch (branchActions.getBranch ());
    };

    //optimistic response
    dispatch (doAllocateSeat (seatId));

    fetch (`/seats/allocation/${seatId}/${id}/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then (response => {
      if (response.status === 401) {
        dispatch (userActions.logout ());
      } else if (!response.ok) {
        dispatch (doCancelAllocateSeat (seatId));
      } else {
        allocateFunc (roomId);
      }
    });
  };
}

// function returnSeat(userId) {
//   return (dispatch, getState) => {
//     const {user: {token}} = getState();

//     dispatch(doReturnSeat(userId));
//     fetch(`/seats/${seatId}/${id}/`, {
//       method: 'POST',
//       headers: {
//         Authorization: `JWT ${token}`,
//       },
//     }).then(response => {
//       if (response.status === 401) {
//         dispatch(userActions.logout());
//       } else if (!response.ok) {
//         dispatch(doAllocateSeat(seatId));
//       }
//     });
//   };
// }

// function assignSeat(seatId) {
//   return (dispatch, getState) => {
//     dispatch(doAssignSeat(seatId));
//   };
// }

// iniital state
const initialState = {};

//reducer
function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_SEATS:
      return applySetRoomSeats (state, action);
    case ALLOCATE_SEAT:
      return applyAllocateSeat (state, action);
    case CANCEL_ALLOCATE_SEAT:
      return applyCancelAllocateSeat (state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetRoomSeats (state, action) {
  const {room} = action;
  return {
    ...state,
    room,
    onAssignment: false,
  };
}

function applyAllocateSeat (state, action) {
  const {seatId} = action;
  const {room: {seats}} = state;
  const updatedSeats = seats.map (seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        seat_image: {file: require ('images/loading_seat.png')}, //로딩 상태를 보여줌
        now_using: true,
      };
    }
    return seat;
  });
  return {
    ...state,
    onAssignment: true,
    room: {...state.room, seats: updatedSeats},
  };
}

function applyCancelAllocateSeat (state, action) {
  const {seatId} = action;
  const {room: {seats}} = state;
  const updatedSeats = seats.map (seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        image_url: null,
        // now_using: false,
      };
    }
    return seat;
  });
  return {...state, seat: {room: {seats: updatedSeats}}};
}
//exports

const actionCreators = {
  getRoomSeats,
  allocateSeat,
};

export {actionCreators};
//reducer export

export default reducer;
