//imports

import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as branchActions } from "redux/modules/branch";

//actions

const SET_ROOM_SEATS = "SET_ROOM_SEATS";
const ALLOCATE_SEAT = "ALLOCATE_SEAT";
const CANCEL_ALLOCATE_SEAT = "CANCEL_ALLOCATE_SEAT";
const NOW_USING_SEAT = "NOW_USING_SEAT";
const RETURN_SEAT = "RETURN_SEAT";
const CANCEL_RETURN_SEAT = "CANCEL_RETURN_SEAT";
//action creators : 리덕스 state를 변경

function setNowUsing(now_using_data) {
  return {
    type: NOW_USING_SEAT,
    now_using_data
  };
}

function setRoomSeats(room) {
  return {
    type: SET_ROOM_SEATS,
    room
  };
}

function doReturnSeat(seatId) {
  return {
    type: RETURN_SEAT,
    seatId
  };
}

function doAllocateSeat(seatId) {
  return {
    type: ALLOCATE_SEAT,
    seatId
  };
}

function doCancelAllocateSeat(seatId) {
  return {
    type: CANCEL_ALLOCATE_SEAT,
    seatId
  };
}

function doCancelReturnSeat(seatId) {
  return {
    type: CANCEL_RETURN_SEAT,
    seatId
  };
}

// API actions: api를 부를 때 사용

//현재 앉아있는 이요하고 있는 좌석 정보를 불러오고 리덕스에 해당 정보 저장
function getNowUsing() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`/seats/user/seat/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(userActions.logout());
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then(json => {
        if (json) {
          dispatch(setNowUsing(json));
        }
      });
  };
}

function getRoomSeats(roomId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/rooms/room/${roomId}/`, {
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
        dispatch(setRoomSeats(json));
      });
  };
}

function returnSeat(userid) {
  return (dispatch, getState) => {
    const {
      user: { token },
      seat: {
        room: { id }
      }
    } = getState();

    const seatId = getState().seat.now_using.seat.id;

    const stateChange = roomId => {
      dispatch(getRoomSeats(roomId));
      // dispatch(branchActions.getBranch());
      dispatch(getNowUsing());
    };

    //optimistic response
    dispatch(doReturnSeat(seatId));

    //좌석 반납시도
    fetch(`/seats/user/${userid}/return/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 201) {
        //좌석반납 성공하면 다시 현재 사용정보 세팅 다시할 것
        stateChange(id);
      } else {
        dispatch(doCancelReturnSeat(seatId));
      }
    });
  };
}

function allocateSeat(seatId, roomId) {
  return (dispatch, getState) => {
    const {
      user: { id, token }
    } = getState();
    const allocateFunc = roomId => {
      dispatch(getRoomSeats(roomId));
      dispatch(branchActions.getBranch());
      dispatch(getNowUsing());
    };

    //optimistic response
    dispatch(doAllocateSeat(seatId));

    fetch(`/seats/allocation/${seatId}/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401 || response.status === 400) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doCancelAllocateSeat(seatId));
      } else {
        allocateFunc(roomId);
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
const initialState = {
  now_using: null,
  room: {}
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_SEATS:
      return applySetRoomSeats(state, action);
    case ALLOCATE_SEAT:
      return applyAllocateSeat(state, action);
    case CANCEL_ALLOCATE_SEAT:
      return applyCancelAllocateSeat(state, action);
    case NOW_USING_SEAT:
      return applyNowUsingSeat(state, action);
    case RETURN_SEAT:
      return applyReturnSeat(state, action);
    case CANCEL_RETURN_SEAT:
      return applyCancelReturnSeat(state, action);
    default:
      return state;
  }
}

// reducer functions

function applyNowUsingSeat(state, action) {
  const { now_using_data } = action;
  console.log(now_using_data);
  return {
    ...state,
    now_using: now_using_data
  };
}

function applySetRoomSeats(state, action) {
  const { room } = action;
  return {
    ...state,
    room,
    onAssignment: false
  };
}

function applyReturnSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;

  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        // seat_image: { file: require("images/loading_seat.png") }, //로딩 상태를 보여줌
        now_using: false
      };
    }
    return seat;
  });
  return {
    ...state,
    onAssignment: true,
    room: { ...state.room, seats: updatedSeats }
  };
}

function applyAllocateSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        seat_image: { file: require("images/loading_seat.png") }, //로딩 상태를 보여줌
        now_using: true
      };
    }
    return seat;
  });
  return {
    ...state,
    onAssignment: true,
    room: { ...state.room, seats: updatedSeats }
  };
}

function applyCancelReturnSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        // image_url: null,
        now_using: true
      };
    }
    return seat;
  });
  return {
    ...state,
    seat: { room: { seats: updatedSeats } }
  };
}

function applyCancelAllocateSeat(state, action) {
  const { seatId } = action;
  const {
    room: { seats }
  } = state;
  const updatedSeats = seats.map(seat => {
    if (seat.id === seatId) {
      return {
        ...seat,
        image_url: null
        // now_using: false,
      };
    }
    return seat;
  });
  return { ...state, seat: { room: { seats: updatedSeats } } };
}
//exports

const actionCreators = {
  getRoomSeats,
  allocateSeat,
  getNowUsing,
  returnSeat
};

export { actionCreators };
//reducer export

export default reducer;
